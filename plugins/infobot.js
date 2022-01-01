let handler = async (m, { conn, command, usedPrefix, text }) => {
  await conn.sendButtonLoc(m.chat, global.infobot, wm, await(await require('node-fetch')(fla + `${command}`)).buffer(), [[`Menu `,`${usedPrefix}menu`]], m)
}
handler.help = ['infobot']
handler.tags = ['info']
handler.command = /^(info(bot)?)$/i

module.exports = handler
