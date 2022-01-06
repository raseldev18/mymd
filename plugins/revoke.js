let handler = async (m, { isAdmin, isOwner, conn, command }) => {
  if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
  let res = await conn.groupInviteCode(m.chat)
  conn.reply(m.chat, `Sukses ${command} link grup, link telah di kirim lewat chat pribadi`, m) 
  conn.reply(m.sender, 'https://chat.whatsapp.com/' + res.code, m)
}
handler.help = ['revoke']
handler.tags = ['group']
handler.command = /^re(voke|new|set)(invite|link)?$/i

handler.group = true
handler.botAdmin = true

module.exports = handler
