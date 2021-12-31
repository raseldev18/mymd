let moment = require('moment-timezone')
let fetch = require('node-fetch')
let handler = m => m

handler.all = async function (m, { isBlocked }) {

    if (m.chat.endsWith('broadcast') || m.fromMe || isBlocked || m.isGroup || db.data.settings[this.user.jid].group) return
    let user = global.db.data.users[m.sender]
    let name = conn.user.name
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    let anu = `
Hai ${await this.getName(m.sender)}, ${ucapan()}
Saya adalah ${namabot}, salah satu bot whatsapp multi device ada yang bisa saya bantu? 

Sebelum menggunakan bot, baca rules bot terlebih dahulu dengan mengetik *#peraturan* atau *#rules*.

Mau chat sama simi(bot)? ketik *#on simi*
`
await conn.sendTemplateButtonLoc(m.chat, anu.trim(), wm, await(await fetch(img)).buffer(), `Menu`, `#menu`, m)
user.pc = new Date * 1
}

module.exports = handler

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "jangan lupa tidur yaah, lop yu<3"
  if (time >= 4) {
    res = "Selamat Pagi ☀"
  }
  if (time > 10) {
    res = "Selamat Siang 🌞"
  }
  if (time >= 15) {
    res = "Selamat Sore 🌝"
  }
  if (time >= 18) {
    res = "Selamat Malam 🌚"
  }
  return res
}
