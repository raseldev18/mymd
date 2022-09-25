async function handler(m, { conn, command }) {
  m.react('⏱️')
  let anu = !/un/.test(command)
  conn.chatModify({ archive: anu, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
  let a = await m.reply(`Berhasil meng${anu ? '' : 'un'}archive chat ini!`) 
  m.react('✅', a.key)
}
handler.help = ['archive', 'unarchive'].map(v => v + 'chat')
handler.tags = ['owner']
handler.command = /^((un)?archive?c(hat)?)$/i
handler.owner = true
handler.desc = ['*A R C H I V E  C H A T*\n\nArchive chat ya/tidak\nPenggunaan : #arc']
module.exports = handler
