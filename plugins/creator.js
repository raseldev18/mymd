function handler(m) {
  this.sendContact(m.chat, global.owner[0] + '@s.whatsapp.net', this.getName(global.owner[0] + '@s.whatsapp.net'), m)
  return conn.reply(m.chat, `Halo kak @${await this.getName(m.sender)} itu nomor ownerku jangan di apa-apain ya kak😖`, m)
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler
