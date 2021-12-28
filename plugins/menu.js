let { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let levelling = require('../lib/levelling')
let fs = require('fs')
const util = require('util')
const os = require('os')
let path = require('path')
let { createHash} = require('crypto')
let fetch = require('node-fetch')
let { perfomance } = require('perf_hooks')
let moment = require('moment-timezone')
const defaultMenu = {
          before: `*Bot ini masih tahap pengembangan, jika ada bug/eror harap laporkan ke owner/developer bot*
%readmore`.trimStart(),
  header: '╭─「 %category 」',
  body: '│ • %cmd %islimit %isPremium',
  footer: '╰────\n',
          after: ` `,
}

let handler = async (m, { conn, usedPrefix: _p, args, command, DevMode }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'anime', 'update', 'edukasi', 'news', 'random', 'game', 'xp', 'islamic', 'stiker', 'rpg', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'vote', 'nsfw', 'audio', 'jadibot', 'info', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'UTAMA',
    'game': 'GAME',
    'anime': 'ANIME', 
    'rpg': 'RPG', 
    'edukasi': 'EDUKASI', 
    'news': 'NEWS', 
    'random': 'RANDOM',
    'xp': 'EXP & LIMIT',
    'sticker': 'STIKER',
    'kerang': 'KERANG AJAIB',
    'quotes': 'QUOTES',
    'admin': `ADMIN ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'GRUP',
    'premium': 'PREMIUM',
    'internet': 'INTERNET',
    'anonymous': 'ANONYMOUS CHAT',
    'nulis': 'MAGER NULIS & LOGO',
    'downloader': 'DOWNLOADER',
    'tools': 'TOOLS',
    'fun': 'FUN',
    'database': 'DATABASE',
    'vote': 'VOTING',
    'absen': 'ABSEN',
    'islamic': 'ISLAMIC',
    'audio': 'PENGUBAH SUARA',
    'jadibot': 'JADI BOT',
    'info': 'INFO',
    'update': 'UPDATE',
    'nsfw': 'NSFW',
    'host': 'HOST',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Rpg'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'random') tags = {
    'random': 'Random'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup'
  }
  if (teks == 'group') tags = {
    'group': 'Group'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'absen') tags = {
    'absen': 'Absen'
  }
  if (teks == 'islamic') tags = {
    'islamic': 'Islamic'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al-Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }
 if (teks == 'nsfw') tags = {
    'nsfw': 'Nsfw'
  }
  if (teks == 'update') tags = {
    'update': 'Update'
  }
 

  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = await registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
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
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let waktuwib = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    
let aoa = `${ucapan()} ${name}.`.trim()
let anu = `Silahkan Pilih Menu Dibawah!`.trim()
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }
  })
    if (teks == '404') {
        const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        listMessage: {
            title: aoa,
            description: anu,
            buttonText: 'Pilih Disini',
            listType: 1,
            footerText: wm,
            mtype: 'listMessage',
            sections: [
              {
                "rows": [{
                  "title": `Semua Perintah`,
                  "description": "Menu Semua Perintah",
                  "rowId": `${_p}? all`
                  }],
                "title": "─────「 1 」"
              }, {
                "rows": [{
                  "title": `Menu Game`,
                  "description": "Menu untuk bermain Game",
                  "rowId": `${_p}? game`
                }],
                "title": "─────「 2 」"
              }, {
                "rows": [{
                  "title": `Menu XP & Limit`,
                  "description": "Menu untuk cek XP & Limit",
                  "rowId": `${_p}? xp`
                }],
                "title": "─────「 3 」"
              }, {
                "rows": [{
                  "title": `Menu Sticker`,
                  "description": "Menu untuk membuat/mencari Sticker",
                  "rowId": `${_p}? stiker`
                }],
                "title": "─────「 4 」"
              }, {
                "rows": [{
                  "title": `Menu Kerang Ajaib`,
                  "description": "Menu kerang ajaib, jawaban random dari Bot",
                  "rowId": `${_p}? kerangajaib`
                }],
                "title": "─────「 5 」"
              }, {
                "rows": [{
                  "title": `Menu Quotes`,
                  "description": "Menu random Quotes",
                  "rowId": `${_p}? quotes`
                }],
                "title": "─────「 6 」"
              }, {
                "rows": [{
                  "title": `Admin & Group`,
                  "description": "Menu untuk Admin & Grup",
                  "rowId": `${_p}? admin`
                }],
                "title": "─────「 7 」"
              }, {
                "rows": [{
                  "title": `Menu Random`,
                  "description": "Menu Random Image/Video/Stiker",
                  "rowId": `${_p}? random`
                }],
                "title": "─────「 8 」"
              }, {
                "rows": [{
                  "title": `Menu Premium`,
                  "description": "Menu untuk pengguna Premium",
                  "rowId": `${_p}? premium`
                }],
                "title": "─────「 9 」"
              }, {
                "rows": [{
                  "title": `Menu Internet`,
                  "description": "Menu untuk menjelajahi Internet",
                  "rowId": `${_p}? internet`
                }],
                "title": "─────「 10 」"
              }, {
                "rows": [{
                  "title": `Menu Anonymous Chat`,
                  "description": "Menu untuk bermain Anonymous Chat versi WhatsApp",
                  "rowId": `${_p}? anonymous`
                }],
                "title": "─────「 11 」"
              }, {
                "rows": [{
                  "title": `Menu Nulis & Logo`,
                  "description": "Menu untuk Nulis & Logo",
                  "rowId": `${_p}? nulis`
                }],
                "title": "─────「 12 」"
              }, {
                "rows": [{
                  "title": `Menu Downloader`,
                  "description": "Menu downlod video/foto/file",
                  "rowId": `${_p}? downloader`
                }],
                "title": "─────「 13 」"
              }, {
                "rows":[{
                  "title": `Menu Tools`,
                  "description": "Menu alat seperti kalkulator & translate",
                  "rowId": `${_p}? tools`
                }],
                "title": "─────「 14 」"
              }, {
                "rows": [{
                  "title": `Menu Fun`,
                  "description": "Menu untuk Fun, jangan baper yak",
                  "rowId": `${_p}? fun`
                }],
                "title": "─────「 15 」"
              }, {
                "rows": [{
                  "title": `Menu Database`,
                  "description": "Menu Database Bot",
                  "rowId": `${_p}? database`
                }],
                "title": "─────「 16 」"
              }, {
                "rows": [{
                  "title": `Menu Vote & Absen`,
                  "description": "Menu untuk Vote & Absen di Grup",
                  "rowId": `${_p}? vote`
                }],
                "title": "─────「 17 」"
              }, {
                "rows": [{
                  "title": `Menu Islamic`,
                  "description": "Menu Agama Islam, tetap jaga toleransi beragama ya🥰",
                  "rowId": `${_p}? islamic`
                }],
                "title": "─────「 18 」"
              }, {
                "rows": [{
                  "title": `Menu Pengubah Suara`,
                  "description": "Menu Pengubah Suara vn/audio",
                  "rowId": `${_p}? audio`
                }],
                "title": "─────「 19 」"
              }, {
                "rows": [{
                  "title":  `Menu Jadi Bot`,
                  "description": "Menu untuk jadibot smentara",
                  "rowId": `${_p}? jadibot`
                }],
                "title": "─────「 20 」"
              }, {
                "rows": [{
                  "title": `Menu Info`,
                  "description": "Menu Info seperti pemilik bot dan source code bot",
                  "rowId": `${_p}? info`
                }],
                "title": "─────「 21 」"
              }, {
                "rows": [{
                  "title":  `Menu Owner`,
                  "description": "Menu Khusus Owner",
                  "rowId": `${_p}? owner`
                }],
                "title": "─────「 22 」"
              }, {
                "rows": [{
                  "title":  `Menu Edukasi`,
                  "description": "Menu Edukasi untuk sehari-hari",
                  "rowId": `${_p}? edukasi`
                }],
                "title": "─────「 23 」"
              }, {
                "rows": [{
                  "title":  `Menu Anime`,
                  "description": "Menu Anime untuk para vvibu baka>//<",
                  "rowId": `${_p}? anime`
                }],
                "title": "─────「 24 」"
              }, {
                "rows": [{
                  "title":  `Menu Rpg`,
                  "description": "Menu untuk bermain Game Rpg",
                  "rowId": `${_p}? rpg`
                }],
                "title": "─────「 25 」"
                }, {
                "rows": [{
                  "title":  `Menu News`,
                  "description": "Menu Berita Local sampai Internasional",
                  "rowId": `${_p}? news`
                }],
                "title": "─────「 26 」"
                }, {
                "rows": [{
                  "title":  `Menu Update Fitur`,
                  "description": "Menu fitur terbaru",
                  "rowId": `${_p}? update`
                }],
                "title": "─────「 27 」"
              }
            ], "contextInfo": {
              "stanzaId": m.key.id,
              "participant": m.sender,
              "quotedMessage": m.message
            }
    }}), { userJid: m.participant || m.key.remoteJid, quoted: m });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
        before,
        ...Object.keys(tags).map(tag => {
          return header.replace(/%category/g, tags[tag]) + '\n' + [
            ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
              return menu.help.map(help => {
                return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                  .replace(/%islimit/g, menu.limit ? '```Limit```' : '')
                  .replace(/%isPremium/g, menu.premium ? '```Premium```' : '')
                  .trim()
              }).join('\n')
            }),
            footer
          ].join('\n')
        }),
        after
      ].join('\n')
      text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      name,
      ucapan: ucapan(),
      name, weton, week, date, dateIslamic, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    //let pp = await conn.profilePictureUrl(conn.user.jid, 'image').catch(_ => path.join(__dirname, '../src/avatar_contact.png'))
    await conn.send3TemplateButtonLoc(m.chat, text.trim(), wm, await(await require('node-fetch')(img)).buffer(), `🏅Owner`, `#owner`, `🎖SnK`, `#snk`, `🎗 Info Bot 🎗`, `#info`, m)
    } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "jangan lupa tidur yaah, lop yu<3"
  if (time >= 4) {
    res = "Selamat Pagi 🌄"
  }
  if (time > 10) {
    res = "Selamat Siang 🌇"
  }
  if (time >= 15) {
    res = "Selamat Sore 🌅"
  }
  if (time >= 18) {
    res = "Selamat Malam 🌆"
  }
  return res
}
