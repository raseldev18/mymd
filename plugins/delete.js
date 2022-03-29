let handler = function (m) {
    if (!m.quoted) throw false
   let { chat, fromMe, id, isBaileys } = m.quoted
   if (!isBaileys) throw false //'Pesan tersebut bukan dikirim oleh bot!'
   conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
  }
  handler.help = ['delete']
  handler.tags = ['main', 'info']
  
  handler.command = /^(de?l?(ete?)?|unsend?)$/i
  
  module.exports = handler
