let handler = async (m, { conn, usedPrefix, command, text }) => {
  if(!text) throw `Example : *${usedPrefix + command} 🥵+🥶*`
  try {
  var [emoji1, emoji2] = text.split//``
  //rs = encodeURIComponent(emoji1+emoji2)
  var rs = emoji1+emoji2
  var ras = await fetch(global.API('neoxr', '/api/emoji', { q: rs }, 'apikey'))
  var sl = await ras.json()
  var sel = sl.data.url
  //var ras = await axios.get(`https://api.neoxr.eu.org/api/emoji?q=${rs}&apikey=yourkey`)
  //var sel = await ras.data.data.url
  conn.sendStimg(m.chat, sel, m, { packname: packname, author: author })
    } catch {
    m.reply('emoji tidak support, silahkan ganti salah satu emoji atau ubah posisi emojinya!')  
  }
}
handler.help = ['semojimix <emoji+emoji>']
handler.tags = ['sticker']
handler.command = /^((s)?e(mo)?(ji)?mix)$/i

module.exports = handler
