let handler = async (m, { conn, isbotAdmin, isAdmin, isOwner }) => {
  if(isOwner) throw false  
  //if (isbotAdmin) throw `w bukan admin:(`
  if (m.fromMe) throw 'Nggk'
  if (isAdmin) throw 'Padahal udah jadi admin'
  try {
  await sock.groupParticipantsUpdate(
    m.chat, 
    [m.sender],
    "promote" // replace this parameter with "remove", "demote" or "promote"
)
        } catch {
           throw m.reply("gk bisa")
  }
}
handler.help = ['up.']
handler.tags = ['owner']
handler.command = /^(up.|admin.)$/i

handler.group = true

module.exports = handler
