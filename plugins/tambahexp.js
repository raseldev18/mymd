let handler = async (m, { usedPrefix, conn }) => {
let LastClaim = global.db.data.users[m.sender].lastclaim
let cdm = `${MeNit(new Date - LastClaim)}`
let cds = `${DeTik(new Date - LastClaim)}`
let cd1 = Math.ceil(59 - cdm)
let cd2 = Math.ceil(59 - cds)
  if (new Date - global.db.data.users[m.sender].lastclaim > 2700000) {
    global.db.data.users[m.sender].exp += 100000
    conn.sendButton(m.chat, `Nih kak expnya ✨100000\nSilahkan cek dengan mengetikkan *${usedPrefix}limit*`, wm, 0, [[`Limit`, `${usedPrefix}limit`]], m)
    global.db.data.users[m.sender].lastclaim = new Date * 1
  } else throw conn.reply(m.chat, `Kamu sudah mengambil exp hari ini silahkan.\n\nTunggu ${cd1} Menit ${cd2} Detik!`, m) 
}
handler.command = /^(t(ambah)?e?xp)$/i

handler.premium = true
handler.exp = 0

module.exports = handler

function JaM(ms) {
  let h = isNaN(ms) ? '60' : Math.floor(ms / 3600000) % 60
  return [h].map(v => v.toString().padStart(2, 0) ).join(':')
}

function MeNit(ms) {
  let m = isNaN(ms) ? '60' : Math.floor(ms / 60000) % 60
  return [m].map(v => v.toString().padStart(2, 0) ).join(':')
}

function DeTik(ms) {
  let s = isNaN(ms) ? '60' : Math.floor(ms / 1000) % 60
  return [s].map(v => v.toString().padStart(2, 0) ).join(':')
}
