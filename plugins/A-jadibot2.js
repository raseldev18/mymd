/* const {
  DisconnectReason, 
  MessageRetryMap, 
  useSingleFileAuthState, 
  fetchLatestBaileysVersion, 
  toBuffer
} = require('baileys')
const WebSocket = require('ws')
let qrcode = require('qrcode')
let simple = require('../lib/simple') 
let fs = require('fs') 

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

const isNumber = x => typeof x === 'number' && !isNaN(x)
if (global.conns instanceof Array) console.log()// for (let i of global.conns) global.conns[i] && global.conns[i].user ? global.conns[i].close().then(() => delete global.conns[id] && global.conns.splice(i, 1)).catch(global.conn.logger.error) : delete global.conns[i] && global.conns.splice(i, 1)
else global.conns = []

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
   conn.tryConnect = conn.tryConnect ? conn.tryConnect : {}
   let conns = global.conn
   if (conn.user.jid !== conns.user.jid) return m.reply('Tidak bisa membuat Bot pada user jadibot!')
  //if (!global.db.data.settings[conn.user.jid].jadibot) return conn.sendButton(m.chat, 'Jadibot tidak aktif', '', isOwner ? `Aktifkan` : `Owner`, isOwner ? `${usedPrefix}1 jadibot` : `${usedPrefix}owner`, m)
  // if (!global.home[m.sender].acc) return m.reply('Nomor kamu belum di Acc Owner, silahkan chat owner')
  //let parent = args[0] && args[0] == 'plz' ? conn : global.conn
   let auth = false
   if (!fs.existsSync('jadibot/')) fs.mkdirSync('jadibot')
   let authFile = 'jadibot/' + parseInt(m.sender) + '.data.json'
   let isInit = !fs.existsSync(authFile)
   // let id = global.conns.length
    let { state, saveState} = useSingleFileAuthState(authFile)
    let { version } = await fetchLatestBaileysVersion()
    const connectionOptions = { 
    	version: version, 
        printQRInTerminal: false,
        auth: state, 
    }
    conn = simple.makeWASocket(connectionOptions)
    // let ev = conn.ev
    
    let date = new Date()
    let timestamp = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    conn.timestamp = timestamp
    conn.tryConnect = {
       jid: m.sender,
       try: 0
    }
    let user = conn.tryConnect
    async function connectionUpdate(update) {
        const { connection, lastDisconnect, isNewLogin, qr } = update
        date = new Date
        console.log(update) 
        timestamp = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        conn.timestamp = timestamp
        if(qr) {
          if (user.try === 5) {
            return m.reply('Waktu scan qr kamu sudah habis!').then(_=> { user.try = 0 })
          }
          let scan = await conns.sendFile(m.chat, 
                await qrcode.toDataURL(qr, { small: true }), 
                'qrcode.png', 
                'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk Whatsapp Web\n3. Scan QR ini\n\nQR Expired dalam 20 detik', 
                m
            )
            setTimeout(() => {
                conns.sendMessage(m.chat, { delete: scan.key } )
            }, 20000)
            user.try += 1
        }
        if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut && conn.ws.readyState !== WebSocket.CONNECTING) {
            // m.reply('Restart...')
        } else if(connection === 'open'){
        	conns.reply(m.chat, `Berhasil Tersambung dengan WhatsApp mu.\n*NOTE: Ini cuma numpang*\nNomor: ${conn.user.jid.split`@`[0]}\nJoin: ${timestamp}\n`, m)
            user.try = 0
        } else if(connection === 'close'){
        	m.reply('Connection Close! Waiting...') 
        } else {
        	m.reply('Report Owner! BugError: '+lastDisconnect?.error?.output)
        }
    }
    
    const tryConnect = function tryConnect(restatConn, close) { 
        let handler = imports('../handler')
  if (restatConn) {
    try { global.conn.ws.close() } catch { }
    global.conn = {
      ...global.conn, ...simple.makeWASocket(connectionOptions)
    }
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
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
  conn.connectionUpdate = connectionUpdate.bind(conn)
  conn.credsUpdate = saveState.bind(conn)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
    }
    await tryConnect()
}
handler.help = ['jadibot2']
handler.tags = ['jadibot']
handler.command = /^(jadibot2)$/i
handler.premium = true 
module.exports = handler */
