let handler = async(m, { conn, usedPrefix, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"]

  if(self === !isPublic) return conn.reply(m.chat,`Dah ${!isPublic ? "Self" : "Public"} dari tadi ${m.sender.split("@")[0] === global.owner[0] ? "Mbak" : "Bang"} :v`, m)

  global.opts["self"] = !isPublic

  conn.sendButton(m.chat, `Berhasil ${!isPublic ? "Self" : "Public"} bot!`, wm, false, [[`${global.opts['restrict'] ? 'Public' : 'Self'}`, `${usedPrefix}${global.opts['restrict'] ? 'public' : 'self'}`]], m)    
}

handler.help = ["self", "public"]
handler.tags = ["owner"]
handler.command = /^(self|public)/i

handler.rowner = true 

module.exports = handler
