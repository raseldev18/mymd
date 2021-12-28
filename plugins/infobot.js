const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))
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
    let mode = //
    let infonya = `
*╭───●──❑ LUCU - BOT ❑──●───*
*│*
*│✇ Library : Baileys-MD*
*│☣ Language : Javascript*
*│☣ Database : MongoDB*
*│✇ Version : ^0.0.1*
*│✇ Developer Bot :* @6285346545126 
*│✇ Runtime : ${runtime}*
*│✇ Prefix : Multi Prefix 「 ${usedPrefix} 」*
*│✇ Mode : -*
*│✇ Tanggal :*
*│✇ ${week} ${date}*
*│✇ Waktu :*
*│✇ ${time}*
*│*
*╰──●─「 MULTI DEVICE 」─●──*
`
let handler = async (m, { conn, jid, text }) => {
//await conn.sendTemplateButtonLoc(m.chat, global.infobott.trim(), wm, await(await require('node-fetch')(img)).buffer(), `✨Menu `,`#menu`, m)
 conn.reply(m.chat, infonya, m, 0, { contextInfo: { mentionedJid: ['6285345545126@s.WhatsApp.net']}})
}
handler.help = ['infobot']
handler.tags = ['info']

handler.command = /^(info(bot)?)$/i

module.exports = handler
