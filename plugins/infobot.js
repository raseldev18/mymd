let handler = async (m, { conn, jid, text }) => {
await conn.sendTemplateButtonLoc(m.chat, global.infobot.trim(), wm, await(await require('node-fetch')(img)).buffer(), `✨Menu `,`#menu`, m)
 // conn.reply(m.chat, global.infobot, m, 0, { contextInfo: { mentionedJid: conn.parseMention(text) }})
}
handler.help = ['infobot']
handler.tags = ['info']

handler.command = /^(info(bot)?)$/i

module.exports = handler