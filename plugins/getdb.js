let fs = require('fs')
let handler  = async (m, { conn, text }) => {
m.reply('Tunggu Sebentar, Proses Getting File database.json')
let db = fs.readFileSync('./database.json')
conn.sendFile(m.chat, db, 'database.json', m)
}
handler.help = ['getdatabase']
handler.tags = ['owner']
handler.command = /^(db|getd(ata)?b(ase)?)$/i

handler.owner = true

module.exports = handler
