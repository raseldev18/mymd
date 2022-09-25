let uploadImage = require('../lib/uploadImage.js')
let { webp2png } = require('../lib/webp2mp4.js')
let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let [atas, bawah] = text.split(/[.,|]/)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!text) throw `${set.sb} *Example* : ${usedPrefix + command} ${atas ? atas : 'teks1'}|${bawah ? bawah : 'teks2'}\n\n_Gesek pesan ini kekanan untuk membuat *sticker meme*_`         
  if (!mime) throw `Balas medianya!`
  if (!/image\/(jpe?g|png)|webp/i.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`
  m.react('⏱️')
  let media = await q.download()
  let image // = Buffer.alloc(0)
  if (/webp/.test(mime)) {
      let anu = await webp2png(media)
      image = await conn.getBuffer(anu)
  } else image = media
  let url = await uploadImage(image)
  let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
  conn.sendSticker(m.chat, meme, m, { packname: '                   Sticker\n\n' + set.pack, author: 'Meme\n\n' + set.auth })
}
handler.help = ['stickermeme'].map(v => v + ' <text1|text2>')
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?me(me)?)$/i
module.exports = handler
