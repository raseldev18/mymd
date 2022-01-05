let handler = async (m, { conn, command, usedPrefix, text }) => {
  let fetch = require('node-fetch')
  let _uptime = process.uptime() * 1000
  let a = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss') 
  let d = new Date(new Date + 3600000)
  let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  let runtime = clockString(_uptime)
  let usergakdaftar = Object.keys(global.db.data.users).length
  let userdaftar = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let infonyacok = `
╭──「 ${conn.user.name} ──࿐
│✇ Library : *Baileys-MD*
│✇ Language : *Javascript*
│✇ Database : *MongoDB*
│✇ Version : *^0.0.1*
│✇ Dev : *@6285346545126*
│✇ Runtime : *${runtime}*
│✇ Prefix : *Multi Prefix 「 ${usedPrefix} 」*
│✇ Mode : *${global.opts['self'] ? 'Self' : 'Public'}*
│✇ User : *${usergakdaftar}*
│✇ Register : *${userdaftar}*
╰─────────⳹
`.trim()
var as = `Tanggal : ${week}, ${date}\nWaktu : ${a} (WIB)`

  await conn.sendButtonLoc(m.chat, infonyacok, as, await(await fetch(fla + `${command}`)).buffer(), [[`Menu`,  `${usedPrefix}menu`]], m)

}
handler.help = ['infobot']
handler.tags = ['info']
handler.command = /^(info(bot)?)$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

