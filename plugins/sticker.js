let fs = require('fs')
let handler = async (m, { conn }) => {
    var q = m.quoted ? m.quoted : m
    var media = await q.download()
    var sell = await conn.sendStimg(m.chat, media, m, { packname: global.packname, author: global.author})
  fs.unlinkSync(sell)
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?(gif)?(wm)?)$/i

module.exports = handler
