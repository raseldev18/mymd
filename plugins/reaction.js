
let handler = async(m, { conn, text }) => {
  if (!text) throw false 
  conn.sendMessage(m.chat, {
        react: {
          text: `${text}`, 
          key: m.quoted ? m.quoted.fakeObj.key : m.key,
        }})
}
handler.help = ['reaction <reply>']
handler.tags = ['fun']
handler.command = /^rea(c?t?i?o?n?)?$/i

module.exports = handler
