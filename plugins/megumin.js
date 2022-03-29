let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, command }) => {
  let res = await fetch('https://api.waifu.pics/sfw/megumin')
  if (!res.ok) throw 'Error Website sedang down'
  let json = await res.json()
  if (!json.url) throw m.reply(eror)
  conn.sendBI(m.chat, `Nihh meguminnya @${m.sender.split('@')[0]}`, wm, json.url, [[`Next`, `${usedPrefix}${command}`]], m, {mention: [m.sender], jpegThumbnail: await(await fetch(json.url)).buffer() })
  
}
handler.help = ['megumin']
handler.tags = ['anime']
handler.command = /^(megumin)$/i

handler.limit = true

module.exports = handler
