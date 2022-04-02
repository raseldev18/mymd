let handler = async(m, { conn }) => {
  let a = "https://telegra.ph/file/90d392a787612bd894610.png"
  conn.sendStimg(m.chat, a, m, {packname: packname, author: author })
}
handler.customPrefix= /^makasih|kasih|mksh|thank|thanks$/i
handler.command = new RegExp

module.exports = handler
