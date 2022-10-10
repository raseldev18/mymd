(async() => {
process.on('uncaughtException', console.error)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
require('./config')
const {
  useMultiFileAuthState, 
  useSingleFileAuthState,
  DisconnectReason
} = require('baileys')
const WebSocket = require('ws')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs/yargs')
const cp = require('child_process')
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const P = require('pino')
const os = require('os')
const chalk = require('chalk')
const simple = require('./lib/simple')
const storeSystem = require('./lib/store.js')
const store = storeSystem.makeInMemoryStore()
const mongoDB = require('./lib/mongoDB')
const { Low, JSONFile } = require('./lib/lowdb')
const PORT = process.env.PORT || 3000

simple.protoType()

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in set.api.name.s ? set.api.name.s[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: set.api.key.s[name in set.api.name.s ? set.api.name.s[name] : name] } : {}) })) : '')
global.set.timestamp = { start: new Date }
// global.db = new Low(new mongoDB("url mongodb"))
global.db = new Low(
  /https?:\/\//.test(set.opts['db'] || '') ?
    new cloudDBAdapter(set.opts['db']) : /mongodb/.test(set.opts['db']) ?
      new mongoDB(set.opts['db']) :
      new JSONFile(`${set.opts._[0] ? set.opts._[0] + '_' : 'rasel'}.db.json`)
) 

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    list: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
global.loadDatabase()

const authF = set.opts['single'] ? `${set.opts._[0] || 'rasel'}.sessi.json` : 'sessions'
const { state, saveState, saveCreds } = set.opts['single'] ? await useSingleFileAuthState(authF) : await storeSystem.useMultiFileAuthState(authF)                      

const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  logger: P({ level: 'silent' }),
  getMessage: async (key) => (conn.loadMessage(key.id) || store.loadMessage(key.id) || {}).message || { conversation: null } //'Please send messages again' }
}

global.conn = simple.makeWASocket(connectionOptions)

/* try {
  store.bind(conn.ev, { groupMetadata: conn.groupMetadata })
  let rahma = `${set.opts._[0] || 'rasel'}.store.json`
  setInterval(() => {
     store.writeToFile(rahma)
  }, 60 * 1000)
} catch {
  console.log(`[ EROR ] CAN'T WRITE STORE`)
} */

if (!set.opts['test']) {
  if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
    if (!set.opts['tmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
  }, 30 * 1000)
}

if (set.opts['server']) require('./server')(global.conn, PORT)

async function connectionUpdate(update) {
  console.log(update)
  const { receivedPendingNotifications, connection, lastDisconnect, isOnline, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  if (connection == 'connecting') console.log(chalk.redBright('⚡ Activate the Bot, please wait a moment...'))
  if (connection == 'open') console.log(chalk.green('✅ Connected'))
  if (isOnline == true) console.log(chalk.green('Status Online'))
  if (isOnline == false) console.log(chalk.red('Status Offline'))
  if (receivedPendingNotifications) console.log(chalk.yellow('Waiting New Messages'))
  if (connection == 'close') console.log(chalk.red('⏱️ Connection stopped and tried to reconnect...'))
  global.set.timestamp.connect = new Date
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
    console.log(global.reloadHandler(true))
  } 
  if (global.db.data == null) await global.loadDatabase()
}

const imports = (path) => {
  path = require.resolve(path)
  let modules, retry = 0
  do {
    if (path in require.cache) delete require.cache[path]
    modules = require(path)
    retry++
  } while ((!modules || (Array.isArray(modules) || modules instanceof String) ? !(modules || []).length : typeof modules == 'object' && !Buffer.isBuffer(modules) ? !(Object.keys(modules || {})).length : true) && retry <= 10)
  return modules
}
let isInit = true
global.reloadHandler = function (restatConn) {
  let handler = imports('./handler')
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    global.conn = {
      ...global.conn, ...simple.makeWASocket(connectionOptions, { chats: oldChats })
    }
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('CB:call', conn.onCall)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }
  conn.welcome = `Hi, @user!\nWelcome in group @subject\n\n@desc`
  conn.bye = 'Goodbye @user!\n\nKalo balik lagi nitip seblak yaah!'
  conn.spromote = '@user is now Admin!'
  conn.sdemote = '@user is not an Admin!'
  conn.sDesc = 'Group description has been changed to\n@desc'
  conn.sSubject = 'Group name has been changed to\n@subject'
  conn.sIcon = 'Group icon has been changed!'
  conn.sRevoke = 'Group link has been changed to\n@revoke'
  conn.sAnnounceOn = 'The group has been closed, now only admins can send messages'
  conn.sAnnounceOff = 'The group has been opened, now all participants can send messages'
  conn.sRestrictOn = 'Edit Group Info changed to admin only!'
  conn.sRestrictOff = 'Edit Group Info changed to all participants'

  conn.handler = handler.handler.bind(conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(conn)
  conn.onDelete = handler.delete.bind(conn)
  conn.onCall = handler.onCall.bind(conn)
  conn.connectionUpdate = connectionUpdate.bind(conn)
  conn.credsUpdate = set.opts['single'] ? saveState.bind(conn) : saveCreds.bind(conn)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('CB:call', conn.onCall)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(Object.keys(global.plugins))
global.reload = (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
global.reloadHandler()

// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    cp.spawn('ffmpeg'),
    cp.spawn('ffprobe'),
    cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    cp.spawn('convert'),
    cp.spawn('magick'),
    cp.spawn('gm'),
    cp.spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done, Session : ', set.opts['single'] ? authF : 'Multi Sessions'))
  .catch(console.error)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
})()
