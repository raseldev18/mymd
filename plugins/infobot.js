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
${sa}${kki} ${conn.user.name} ${kka}
${gy} Library : *Baileys-MD*
${gy} Language : *Javascript*
${gy} Database : *MongoDB*
${gy} Version : *${versibot}*
${gy} Developer : *@6285346545126*
${gy} Runtime : *${runtime}*
${gy} Prefix : *Multi Prefix 「 ${usedPrefix} 」*
${gy} Mode : *${global.opts['self'] ? 'Self' : 'Public'}*
${gy} User : *${usergakdaftar}*
${gy} Register : *${userdaftar}*
${sb}
`.trim()
var as = `Tanggal : ${week}, ${date}\nWaktu : ${a} (WIB)`
 //conn.sendTBL(m.chat, infonyacok, as, fla + `${command}`, `Source Code Bot ✨`, `https://github.com/raselcomel/lucubot-md`, null, null, `Menu`, `${usedPrefix}menu`, null, null, null, null, m, 
     conn.sendBL(m.chat, infonyacok, as, fla + `${command}`, [[`SC Bot`, `${usedPrefix}sc`], [`Menu`, `${usedPrefix}menu`]], m,        
           {mentions: ['6285346545126@s.whatsapp.net']})

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

