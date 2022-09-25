let Carbon = require("unofficial-carbon-now")

let handler = async(m, { conn, usedPrefix, command, text }) => {
  if (!m.quoted && !text) throw `${set.sb} *Example* : ${usedPrefix + command} text/reply\n\n_Gesek pesan ini kekanan untuk membuat gambar teks *carbon*_`             
  m.react('⏱️')
  let buat = new Carbon.createCarbon().setCode(m.quoted ? m.quoted.text : text)
  let hasil = await Carbon.generateCarbon(buat)
  conn.sendMedia(m.chat, hasil, m)
}
handler.help = ['carbon'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(code|carbon)$/i
module.exports = handler
