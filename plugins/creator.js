function handler(m) {
  this.sendContact(m.chat, global.owner[0] + '@s.whatsapp.net', this.getName(global.owner[0] + '@s.whatsapp.net'), m)
  return m.reply (`Halo kak @${m.sender.split`@`[0]} itu nomor ownerku jangan di apa-apain ya kak`, )
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler