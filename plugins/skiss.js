let handler = async(m, { conn, usedPrefix, command }) => {
  try {
  var a = await axios.get("https://nekos.life/api/kiss")
  var b = await a.data.url
  } finally {
  if(b) conn.sendStimg(m.chat, b, m, {packname: packname, author: "       Sticker Kiss\n\n"+author})
  else return conn.sendB(m.chat, eror, null, [[`Repeat`, `${usedPrefix}${command}`]], m) 
 }
}
handler.help = ['skiss']
handler.tags = ['sticker']
handler.command = /^s?(tic?ker)?kiss$/i

module.exports = handler
