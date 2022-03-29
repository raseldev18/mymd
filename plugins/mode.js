let handler = async(m, { conn, usedPrefix, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"]
  if(self === !isPublic) return conn.sendB(m.chat, `Dah ${!isPublic ? "Self" : "Public"} dari tadi ${m.sender.split("@")[0] === global.owner[0] ? "Mbak" : "Bang"} :v`, wm, false, [[`${!isPublic ? "Public" : "Self"}`, `${usedPrefix}${!isPublic ? "public" : "self"}`]], m)
  global.opts["self"] = !isPublic
  conn.sendB(m.chat, `Berhasil ${!isPublic ? "Self" : "Public"} bot!`, wm, false, [[`${!isPublic ? "Public" : "Self"}`, `${usedPrefix}${!isPublic ? "public" : "self"}`]], m)    
}
handler.help = ["self", "public"]
handler.tags = ["owner"]
handler.command = /^(self|public)/i

handler.rowner = true 

module.exports = handler
