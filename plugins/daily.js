const free = 500
const prem = 5000
const freelimit = 5
const premlimit = 5
let handler = async (m, { conn, usedPrefix, isPrems }) => {
  if (db.data.users[m.sender].level < 1) return conn.sendB(m.chat, `Naikkan level kamu dengan mengetikkan\n${usedPrefix}levelup`, wm, 0, [[`Level Up`,`${usedPrefix}levelup`]], m) 
  let time = db.data.users[m.sender].lastclaim + 86400000
  if (new Date - db.data.users[m.sender].lastclaim < 86400000) throw `Kamu sudah mengklaim klaim harian hari ini\ntunggu selama ${msToTime(time - new Date())} lagi`
  db.data.users[m.sender].limit += isPrems ? premlimit * 2 : freelimit * 1
  db.data.users[m.sender].exp += isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level
  conn.sendB(m.chat, `Selamat kamu mendapatkan *+${isPrems ? prem * db.data.users[m.sender].level : free * db.data.users[m.sender].level}* XP & *+${isPrems ? premlimit * 2 : freelimit * 1 }* Limit dari claim harian\n\nsemakin tinggi level, semakin tinggi juga XP yang didapat`, wm, 0, [[`Balance`, `${usedPrefix}balance`]], m)
  db.data.users[m.sender].lastclaim = new Date * 1
}
handler.help = ['claim']
handler.tags = ['xp']
handler.command = /^(daily|c?k?laim)$/i

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit"
}
