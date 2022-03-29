const { createHash } = require('crypto')
let handler = async (m, { conn, isGroup, isRegister }) => {
    let sn = createHash('md5').update(m.sender).digest('hex')
    if(m.isGroup) m.reply(`*SN* telah di kirim ke private chat`)
    conn.reply(m.sender, `${sn}`)
}
handler.help = ['sn']
handler.tags = ['xp']
handler.command = /^((cek)?sn(cek)?)$/i

handler.register = true

module.exports = handler
