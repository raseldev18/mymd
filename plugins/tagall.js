let handler = async(m, { isOwner, isAdmin, conn, text, participants }) => {
  if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
  let teks = `*───「 Tag All Member 」───*\n${text ? text : ' '}\n\n`
  for (let mem of participants) {
  teks += `@${mem.id.split('@')[0]}\n`}
  teks += `\n*${namabot}*`
  conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
}
handler.help = ['tagall <pesan>']
handler.tags = ['group']
handler.command = /^(t(agall)?)$/i

handler.group = true

module.exports = handler
