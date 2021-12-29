let handler = async (m, { conn, usedPrefix, text }) => {
  await conn.sendTemplateButtonLoc(m.chat, global.infobott.trim(), wm, await(await require('node-fetch')(img)).buffer(), `✨Menu `,`#menu`, m)
}
handler.help = ['infobot']
handler.tags = ['info']
handler.command = /^(info(bot)?)$/i

module.exports = handler
