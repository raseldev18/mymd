let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, usedPrefix, command, text }) => {
    if(!text) throw `Nama wmnya apa?\ncontoh: *${usedPrefix}${command} rasel|comel*`
    try {
    var [p, a] = text.split `|`
    var q = m.quoted ? m.quoted : m
    var ras = await q.download()
    var sel = await webp2png(ras)
    } finally {
     if(sel) conn.sendStimg(m.chat, sel, m, { packname: p || '', author: a || '' })
     else throw `Balas stiker dengan caption *${usedPrefix}${command} packname|author*`
  }
}   
handler.help = ['wm'].map(v => v + ' <packname|author>')
handler.tags = ['sticker', 'premium']
handler.command = /^(wm)$/i

handler.premium = true

module.exports = handler
