async function handler(m, { conn }) {
  m.react('⏱️')
  conn.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
  let a = await m.reply("Berhasil menghapus chat ini!") 
  m.react('✅', a.key)
}
handler.help = ['deletechat'],
handler.tags = ['owner'],
handler.command = /^(deletechat|delchat|dchat)$/i
handler.owner = true
handler.desc = ['*D E L E T E  C H A T*\n\nMenghapus chat di chat ini\nPenggunaan : #delchat']
module.exports = handler
