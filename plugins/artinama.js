const { artinama } = require('@bochilteam/scraper')
let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) throw `uhm.. namanya?\n\ncontoh:\n${usedPrefix + command} rasel`
  var name = await artinama(text) 
  conn.sendTBL(m.chat, name, 'Artinama by '+wm, fla + text, 'Anu', urlnya, null, m)
}
handler.help = ['artinama'].map(v => v + ' <name>')
handler.tags = ['kerang']
handler.command = /^artiname?a?$/i

module.exports = handler
