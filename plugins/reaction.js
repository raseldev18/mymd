
let handler = async(m, { conn, text }) => {
  conn.sendMessage(m.chat, {
        react: {
          text: `${text}`, 
          key: m.key,
        }})
}
handler.help = ['reaction <reply>']
handler.tags = ['fun']
handler.command = /^rea(c?t?i?o?n?)?$/i

module.exports = handler
