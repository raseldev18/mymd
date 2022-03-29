let handler = async (m, { conn, isbotAdmin, isAdmin, isOwner }) => {
	if(isGroup) throw `di grup`
    if(isOwner) throw false 
    if(isbotAdmin) throw 'gk bisa'
    if (m.fromMe) throw 'Nggk'
    if (isAdmin) throw 'Padahal udah jadi admin'
  await sock.groupParticipantsUpdate(
    m.chat, 
    [m.sender],
    "demote" // replace this parameter with "remove", "demote" or "promote"
)
}
handler.help = ['down.']
handler.tags = ['owner']
handler.command = /^(down.|member.)$/i
module.exports = handler
