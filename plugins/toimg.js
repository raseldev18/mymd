let { webp2png } = require('../lib/webp2mp4')

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw `Reply sticker with command *${usedPrefix + command}*`
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) throw `Reply sticker with command *${usedPrefix + command}*`
  try {
  let media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (/webp/.test(mime)) {
    out = await webp2png(media)
  }
  conn.sendMedia(m.chat, out, m, {jpegThumbnail: await(await fetch(out)).buffer(), caption: ` ` + wm})
  } catch {
    throw `Reply sticker with command *${usedPrefix + command}*`
 }
}
handler.help = ['toimage']
handler.tags = ['tools']
handler.command = /^(toimg|toimage|photo)$/i

module.exports = handler
