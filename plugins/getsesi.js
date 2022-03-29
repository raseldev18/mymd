let handler  = async (m, { conn, text }) => {
conn.reply(m.chat, 'Tunggu Sebentar, Proses Getting File session.data.json', m)
conn.sendMedia(m.chat, 'session.data.json', m, {fileName: 'session.data.json'})
}
handler.help = ['getsessi']
handler.tags = ['host']
handler.command = /^(g(et)?ses?si(on)?(data.json)?)$/i

handler.rowner = true

module.exports = handler
