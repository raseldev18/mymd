let handler = async (m, { conn, usedPrefix, text }) => {
let data = fs.readFileSync('./lib/hack.js')
let parse = JSON.parse(data)
let random = Math.floor(Math.random() * parse.length);
let json = parse[random]

  conn.sendBL(m.chat, `Sukses Bobol Bank Satria\n\nSaldo & Limit Yang Diambil ${json.money}\nKamu Bisa Cek LIMIT/EXP/MONEY KAMU Dengan Mengetik *${usedPrefix}limit* Atau Klik Button Di Bawah Ini!`, wm, fla + 'hack', [['Cek Limit', '#limit'], ['Hack Lagi', 'xhack']], m)
   global.db.data.users[m.sender].exp += json.exp * 1
   global.db.data.users[m.sender].limit += json.exp * 1
}
handler.help = ['hack']
handler.tags = ['xp']
handler.command = /^hack$/i

handler.register = true
handler.xp = 150

module.exports = handler
