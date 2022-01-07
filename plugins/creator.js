let handler = async(m, { conn }) => {
  conn.sendContact(m.chat, global.owner[0] + '@s.whatsapp.net', conn.getName(global.owner[0] + '@s.whatsapp.net'), m)
  await conn.sendMessage(m.chat, `Halo kak ${await conn.getName(m.sender)} itu nomor ownerku jangan di apa-apain ya kak😖`, m)
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler
