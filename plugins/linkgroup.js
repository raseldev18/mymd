let handler = async (m, { conn }) => {
	var a = await conn.groupInviteCode
    var b = await conn.getName(a)
    var c = await conn.groupMetadata(a)
    var d = `${c.participants.length}`
    conn.reply(m.chat, `*Link Group ${b}*\n\nhttps://chat.whatsapp.com/` + a `\n\nTotal bocil` + d, m)
  }
  handler.help = ['linkgroup']
  handler.tags = ['group']
  handler.command = /^link(g(c)?ro?up)?$/i
  
  handler.group = true
  handler.botAdmin = true
  
  module.exports = handler
