function handler(m) {
  this.sendContact(m.chat, '6285346545126@s.whatsapp.net', this.getName('6285346545126@s.whatsapp.net'), m)
  //return m.reply (`Halo kak @${m.sender.split`@`[0]} itu nomor developer bot jangan diapa apain ya kak😖`)
}
handler.help = ['creator']
handler.tags = ['info']

handler.command = /^((creator|dev(eloper)?)(bot)?)$/i

module.exports = handler