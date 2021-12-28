let { promisify } = require('util')
let _gis = require('g-i-s')
let gis = promisify(_gis)

let handler  = async (m, { conn, args, text }) => {
  if (!text) return m.reply('Cari apa?\njangan nyari bok3p yaa, dosa 😖')
  let results = await gis(text) || []
  let { url, width, height } = pickRandom(results) || {}
  if (!url) return m.reply('Maaf image tidak ditemukan!')
  conn.sendTemplateButtonImg(m.chat, `
*────「 GOOGLE IMAGE 」───*

➤ *search :* ${text}
➢ *width :* ${width}
➢ *height :* ${height}
`.trim(), wm, await(await require('node-fetch')(url)).buffer(), `Get Again`, `#image ${text}`, m)
}
handler.help = ['image <query>']
handler.tags = ['internet']
handler.command = /^((g(oogle)?)?ima?ge?)$/i

module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
