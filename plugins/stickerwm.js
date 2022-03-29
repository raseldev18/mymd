let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, usedPrefix, command, text }) => {
    if(!text) return conn.reply(m.chat, `Nama wmnya apa?\ncontoh: *${usedPrefix}${command} rasel|comel 😶*`, m)
    try {
    var [p, a] = text.split `|`
    var q = m.quoted ? m.quoted : m
    var ras = await q.download()
    var sel = await webp2png(ras)
    } finally {
    if(sel) await conn.sendStimg(m.chat, sel, m, { packname: p || '', author: a || '' })
    else return conn.reply(m.chat, `Balas stiker dengan caption *${usedPrefix}${command} packname|author* `, m) 
  }
}   
handler.help = ['stickerwm'].map(v => v + ' <packname|author>')
handler.tags = ['sticker', 'premium']
handler.command = /^(s(tic?k(er)?)?wm)$/i

handler.premium = true 

module.exports = handler
