let handler = async (m, { conn }) => {
    var namagcnya = conn.getName(m.chat)
    conn.reply(m.chat, `*Link Group:* ${namagcnya}\n\nhttps://chat.whatsapp.com/` + await conn.groupInviteCode(m.chat), m)
  }
  handler.help = ['linkgroup']
  handler.tags = ['group']
  handler.command = /^link(g(c)?ro?up)?$/i
  
  handler.group = true
  handler.botAdmin = true
  
  module.exports = handler
