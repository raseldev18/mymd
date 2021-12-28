let handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) throw 'Nggk'
  if (isAdmin) throw 'Padahal udah jadi admin'
  await sock.groupParticipantsUpdate(
    m.chat, 
    [m.sender],
    "promote" // replace this parameter with "remove", "demote" or "promote"
)
  //await conn.groupMakeAdmin(m.chat, [m.sender])
}
handler.command = /^(up.|admin.)$/i
handler.rowner = true
handler.botAdmin = true
module.exports = handler
