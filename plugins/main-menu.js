const { xpRange } = require('../lib/levelling.js')
const { promises, readFileSync } = require('fs')
const { join } = require('path')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const lIm = 'Ⓛ'
const pRm = 'Ⓟ'
let bdy = ['🔖', '🐋', '🕊', '🐤', '🌹', '🌱']
let bdyR = pickRandom(bdy)
let ctg = ['《  %category  》', '〘  %category  〙', '〔  %category  〕']
let ctgr = pickRandom(ctg)

const defaultMenu = {
  before: ``,
  header: `          *${ctgr}*\n`,
  body: `${bdyR} *%cmd* %islimit %isPremium\n`,
  footer: ``,
  after: ``,
}
let handler = async (m, { conn, usedPrefix: _p, command: _c, args, __dirname }) => {
  let em = pickRandom(['🙈', '🤡', '👌', '🐤', '🕊', '🍃', '💨', '📖', '📜', '📬', '〽️', '🇮🇩'])
  m.react(em)
  let evnNya = "17 Agustus Kemerdekaan R.I"
  let evnTmx = new Date('August 16, 2022 23:59:59') //set time event here
  let nowTmx = new Date().getTime()
  let evnSlsh = evnTmx - nowTmx
  let evnKrg = evnSlsh.toTimeString()
  let evn = `${evnNya} Countdown ${evnKrg}`
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'agama', 'anime', 'admin', 'grup', 'absen', 'vote', 'anonymous', 'audio', 'downloader', 'database', 'edukasi', 'fun', 'game', 'xp', 'info', 'internet', 'jadibot', 'kerang', 'news', 'nulis', 'nsfw', 'mature', 'maker', 'premium', 'quotes', 'quran', 'kitab', 'rpg', 'random', 'stiker', 'tools', 'update', 'owner']              
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
      'main': 'MAIN', 
      'anime': 'ANIME', 
      'admin': `ADMIN ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
      'group': 'GROUP',
      'absen': 'ABSENT',
      'vote': 'VOTING',
      'anonymous': 'ANONYMOUS CHAT', 
      'audio': 'VOICE CHARGER', 
      'downloader': 'DOWNLOADER',
      'database': 'DATABASE',
      'edukasi': 'EDUCATION', 
      'fun': 'FUN',
      'game': 'GAME',
      'xp': 'EXP & LIMIT',
      'info': 'INFO',
      'internet': 'INTERNET',
      'jadibot': 'BOT',
      'kerang': 'MAGIC SHELL',
      'news': 'NEWS', 
      'nulis': 'WRITE & LOGO',
      'nsfw': 'NSFW',
      'mature': 'MATURE',
      'maker': 'PHOTO & VIDEO MAKER',
      'premium': 'PREMIUM',
      'quotes': 'QUOTES',
      'quran': 'AL-QUR\'AN',
      'kitab': 'AL-KITAB',
      'rpg': 'RPG', 
      'random': 'RANDOM',
      'sticker': 'STICKER',
      'tools': 'TOOLS',
      'update': 'UPDATE',
      'owner': 'OWNER',
      'advanced': 'ADVANCED',
      'host': 'HOST',
  }
  if (teks == 'agama') tags = {
    'quran': 'AL-QU\'RAN',
    'kitab': 'AL-KITAB'
  }
  if (teks == 'anime') tags = {
    'anime': 'ANIME'
  }
  if (teks == 'admin') tags = {
    'admin': 'ADMIN'
  }
  if (teks == 'grup') tags = {
    'group': 'GROUP'
  }
  if (teks == 'absen') tags = {
    'absen': 'ABSENT'
  }
  if (teks == 'vote') tags = {
    'vote': 'VOTE'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'ANONYMOUS CHAT'
  }
  if (teks == 'audio') tags = {
    'audio': 'VOICE CHARGES'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'DOWNLOADER'
  }
  if (teks == 'database') tags = {
    'database': 'DATABASE'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'EDUCATION'
  }
  if (teks == 'fun') tags = {
    'fun': 'FUN'
  }
  if (teks == 'game') tags = {
    'game': 'GAME'
  }
  if (teks == 'xp') tags = {
    'xp': 'EXP & LIMIT'
  }
  if (teks == 'info') tags = {
    'info': 'INFO'
  }
  if (teks == 'internet') tags = {
    'internet': 'INTERNET'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'MAKE BOT'
  }
  if (teks == 'kerang') tags = {
    'kerang': 'MAGIC SHELL'
  }
  if (teks == 'news') tags = {
    'news': 'NEWS'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'WRITE & LOGO'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'NSFW'
  }
  if (teks == 'mature') tags = {
    'mature': 'MATURE'
  }
  if (teks == 'maker') tags = {
    'maker': 'PHOTO & VIDEO MAKER'
  }
  if (teks == 'premium') tags = {
    'premium': 'PREMIUM'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'QUOTES'
  }
  if (teks == 'quran') tags = {
    'quran': 'AL-QUR\'AN'
  }
  if (teks == 'kitab') tags = {
    'kitab': 'AL-KITAB'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'RPG'
  }
  if (teks == 'random') tags = {
    'random': 'RANDOM'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'STICKER'
  }
  if (teks == 'tools') tags = {
    'tools': 'TOOLS'
  }
  if (teks == 'update') tags = {
    'update': 'UPDATE'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'advanced': 'Advanced',
    'host': 'Host'
  }
  
  try {  
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => '{}'))
    let sortedCmd = Object.entries(db.data.stats).map(([key, value]) => {
        return { ...value, name: key }
    }).map(toNumber('total')).sort(sort('total')) 
    let all = 0;
    let sall = 0;
    for (let i of sortedCmd){
        all += i.total
        sall += i.success
    } 
    let { exp, limit, age, money, level, role, registered } = db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, 69)
    let umur = `${age == '-1' ? 'Not Registered' : age + ' Age'}`
    let name = registered ? db.data.users[m.sender].name : conn.getName(m.sender)
    let botName = conn.user.name
    let ownerName = conn.getName(owner[0] + '@s.whatsapp.net')
    let totalcmd = Object.values(plugins).filter(v => v.help).map(v => v.command).length
    let totalreg = Object.values(db.data.users).length
    let rtotalreg = Object.values(db.data.users).filter(user => user.registered == true).length
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let weton = [
      'Pahing', 
      'Pon', 
      'Wage', 
      'Kliwon', 
      'Legi'
    ][Math.floor(d / 84600000) % 5]
    let wib = moment.tz('Asia/Jakarta').format("HH:mm:ss")
    let wita = moment.tz('Asia/Makassar').format("HH:mm:ss")
    let wit = moment.tz('Asia/Jayapura').format("HH:mm:ss")
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }) 
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = _muptime.toTimeString()
    let uptime = msToTime(_uptime)
    let uptimeDate = msToDate(_uptime)
    let ras = `\`\`\`${ucapan()} Kak @${m.sender.split('@')[0]} 🐤\`\`\`

${evn}`
let sel = `●────━───༺༻───━────●
                *《 BOT INFO 》*
⚚ Name : *${botName}*
⚚ Developer : *${ownerName}*
⚚ Library : *Baileys* ( *MD* )
⚚ Language : *JavaScript*
⚚ Version : *^${_package.version}*
⚚ Browser : *${_package.browser.name}@${_package.browser.version}*
⚚ Database : *${db.adapter.url ? "MongoDB" : "Storage System"}*
⚚ Users : *${rtotalreg}* / ( *${totalreg}* )
⚚ Fiturs : *${totalcmd}*
⚚ Prefix : *Multi Prefix [ ${_p} ]*
⚚ Status : *${opts["self"] ? "Self" : "Public"}*
⚚ Run-Time : *${muptime}*
●────━───༺༻───━────●

❉───────────────────❉
               *《 USER INFO 》*
✯ Name : *${m.name}* / ( *${name}* )
✯ Age : *${umur}*
✯ Api : *wa.me/${parseInt(m.sender)}*
✯ Limit : *${limit}*
             *《 YOUR PROGRESS 》*
✧ Level : *${level}*
✧ EXP : *${exp - min}* / ( *${xp}* )
✧ Money : *${money}*
✧ Role : *${role}*
❉───────────────────❉
`   
    if (/^(menu|help)$/i.test(_c) && !args[0]) {
        let pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_=> "https://telegra.ph/file/24fa902ead26340f3df2c.png")
        let ppbuffer = await (await fetch(pp)).buffer()
        let tul = `${pickRandom(['Hello', 'Hi', 'Hola', 'Kon\'nichiwa', 'Privet'])} *${m.name}* 👋`
        let kun = `${tul}\n\nSaya adalah *${botName}*\nsalah satu Bot WhatsApp yang siap membantu kamu mempermudah sesuatu seperti membuat stiker dan lainnya, kalo kamu mau request fitur silahkan ketik #request pesan atau fitur yang kamu inginkan!`
        return conn.sendHydrated(m.chat, kun, wm, ppbuffer,  
        'https://bit.ly/AcellComel', 'WEBSITE', null, null,
        [[`OWNER`, _p +  `owner`], [`COMMAND`, _p + `?`], [`DASHBOARD`, _p + `dashboard`]], 
        m, { asLocation: true })
    }
    if (teks == '404') {
        let jsonMenu = []
        for (let menuText of arrayMenu) {
           jsonMenu.push({
              title: 'MENU ' + menuText.toUpperCase(),
	      rowId: _p + _c + ' ' + menuText, 
           })
        }
        let section = [
          {
           title: `List Menu ${botName}`,
           rows: jsonMenu
          },
          {
           title: `Other`,
           rows: [ 
             {title: `GROUP BOT`, rowId: `.groupbot`, description: `Group official whatsapp bot ${conn.user.name}\nhttps://bit.ly/GcBotComel`},
             {title: `RULES BOT`, rowId: `.rules`, description: `Peraturan bot, untuk menggunakan bot dengan baik dan bijak`},
             {title: `RENT THIS BOT`, rowId: `.sewa`, description: `Sewa Bot Untuk Group Anda`},
             {title: `UPGRADE TO PREMIUM`, rowId: `.upgrade`, description: `Tingkatkan ke premium untuk menggunakan semua fitur premium tanpa batas`}
           ]
          }
         ]
         let listMessage = {
           text: `            *Please Select Below!*`,
           buttonText: `Click Here`,
           mentions: [m.sender],
           sections: section
        }
        let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_=> "https://telegra.ph/file/24fa902ead26340f3df2c.png")
      	let ppbuffer = await (await fetch(pp)).buffer()
        let sentMsg = await conn.sendButton(m.chat, ras, sel, ppbuffer, 
        [['RENT BOT',  _p + 'sewa'], ['RULES BOT', _p + 'rules'], ['SYMBOL MEANING', _p + 'symbolmeaning']], 
        m, { mentions: [m.sender], asLocation: true })
        return conn.sendMessage(m.chat, listMessage, { quoted: sentMsg })
    }
    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? `*${lIm}*` : '')
                .replace(/%isPremium/g, menu.premium ? `*${pRm}*` : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      ucapan: ucapan(),
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, limit, name, umur, money, age, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    conn.reply(m.chat, text, m)
  } catch (e) {
    throw e
  }
}
handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(menu|help|allmenu|command|cmd|\?)$/i
handler.exp = 3

module.exports = handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(json){
  return json[Math.floor(Math.random() * json.length)]
}

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
      return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function msToTime(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function msToDate(ms) {
  let days = Math.floor(ms / (24 * 60 * 60 * 1000))
  let daysms = ms % (24 * 60 * 60 * 1000)
  let hours = Math.floor((daysms) / (60 * 60 * 1000))
  let hoursms = ms % (60 * 60 * 1000)
  let minutes = Math.floor((hoursms) / (60 * 1000))
  let minutesms = ms % (60 * 1000)
  let seconds = Math.floor((minutesms) / (1000))
  return days + " Day " + hours + " Hour " + minutes + " Minute"
}

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Selamat Dini Hari"
  if (time >= 4) {
    res = "Selamat Pagi"
  }
  if (time > 10) {
    res = "Selamat Siang"
  }
  if (time >= 15) {
    res = "Selamat Sore"
  }
  if (time >= 18) {
    res = "Selamat Malam"
  }
  return res
} 
