let handler = async (m, { conn }) => {
    var a = await conn.groupInviteCode
    var b = await conn.groupMetadata(a)
    var c = `${b.participants.length}`
    conn.reply(m.chat, `*Link Group :*\n\nhttps://chat.whatsapp.com/` + a `\n\n*Total member :*` + c, m)
  }
  handler.help = ['linkgroup']
  handler.tags = ['group']
  handler.command = /^link(g(c)?ro?up)?$/i
  
  handler.group = true
  handler.botAdmin = true
  
  module.exports = handler
