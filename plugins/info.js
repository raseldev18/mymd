let handler = async (m, { conn, usedPrefix, text }) => {
	let d = new Date(new Date + 3600000)
    let locale = 'id'
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
    let _uptime = process.uptime() * 1000
    let time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss') 
    let runtime = clockString(_uptime)
    let mode = //
    let info = `
*╭───●──❑ LUCU - BOT ❑──●───*
*│*
*│✇ Library : Baileys-MD*
*│☣ Language : Javascript*
*│☣ Database : MongoDB*
*│✇ Version : ^0.0.1*
*│✇ Developer :* @6285346545126 
*│✇ Runtime : ${runtime}*
*│✇ Prefix : Multi Prefix 「 ${usedPrefix} 」*
*│✇ Mode : -*
*│✇ Tanggal :*
*│✇ ${week} ${date}*
*│✇ Waktu :*
*│✇ ${time}*
*│*
*╰──●─「 MULTI-DEVICE 」─●───*
`
  await conn.sendTemplateButtonLoc(m.chat, info.trim(), wm, await(await require('node-fetch')(img)).buffer(), `✨Menu `,`#menu`, m)
}
handler.help = ['infobot']
handler.tags = ['info']

handler.command = /^(info(bot)?)$/i

module.exports = handler