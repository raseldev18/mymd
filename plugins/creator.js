const delay = time => new Promise(res => setTimeout(res, time))
let handler = async(m, { conn }) => {
  conn.sendContact(m.chat, global.owner[0] + '@s.whatsapp.net', conn.getName(global.owner[0] + '@s.whatsapp.net'), m)
  await delay(500)
  conn.reply(m.chat, `Halo kak ${await conn.getName(m.sender)} itu nomor ownerku jangan di apa-apain ya kak😖`, m)
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler
