let handler = async (m, { text, conn, isOwner, isAdmin, args }) => {
  if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
  let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
  if(m.quoted){
if(m.quoted.sender === ownerGroup || m.quoted.sender === conn.user.jid) return;
let usr = m.quoted.sender;
await sock.groupParticipantsUpdate(
  m.chat, 
  [usr],
  "promote" // replace this parameter with "remove", "demote" or "promote"
)
//conn.groupRemove(m.chat, [usr]); return;
} 
  if(!text && !m.quoted) return conn.reply(m.chat, `tag yang mau di jadiin admin`, m) 
  let users = m.mentionedJid.filter(u => !(u == ownerGroup || u.includes(conn.user.jid)))
  for (let user of users) if (user.endsWith('@s.whatsapp.net')) await sock.groupParticipantsUpdate(
    m.chat, 
    [user],
    "promote" // replace this parameter with "remove", "demote" or "promote"
)
 // await conn.groupRemove(m.chat, [user])
}
handler.help = ['promote @user']
handler.tags = ['admin']
handler.command = /^(promote|admin|\^)$/i

handler.group = true
handler.botAdmin = true

module.exports = handler
