let handler  = async (m, { conn, text }) => {
conn.reply(m.chat, 'Tunggu Sebentar, Proses Getting File database.json', m)
conn.sendMedia(m.chat, 'database.json', m, {fileName: 'database.json'})
}
handler.help = ['getdatabase']
handler.tags = ['host']
handler.command = /^(g(et)?d(ata)?b(ase)?)$/i

handler.rowner = true

module.exports = handler
