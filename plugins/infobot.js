let handler = async (m, { conn, command, usedPrefix, text }) => {
  let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  let _uptime = process.uptime() * 1000
  let time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss') 
  let runtime = clockString(_uptime)
  let usergakdaftar = Object.keys(global.db.data.users).length
  let userdaftar = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let infonyacok = `
╭──「 ${namabot} ──࿐
│✇ Library : *Baileys-MD*
│✇ Language : *Javascript*
│✇ Database : *MongoDB*
│✇ Version : *^0.0.1*
│✇ Dev : *@6285346545126*
│✇ Runtime : *${runtime}*
│✇ Prefix : *Multi Prefix*
│✇ Mode : *${global.opts['self'] ? 'Self' : 'Public'}*
│✇ User : *${usergakdaftar}*
│✇ Register : *${userdaftar}*
╰─────────⳹
`.trim()
  await conn.sendButtonLoc(m.chat, infonyacok, `${week}, ${date}\n${time}`, await(await require('node-fetch')(fla + `${command}`)).buffer(), [[`Menu `,`${usedPrefix}menu`]], m)
}
handler.help = ['infobot']
handler.tags = ['info']
handler.command = /^(info(bot)?)$/i

module.exports = handler
