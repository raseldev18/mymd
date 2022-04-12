let handler = async (m, { conn, isAdmin, isOwner, usedPrefix }) => {
    if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
    let id = m.chat
    let lang = db.data.users[m.sender].language
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        let caption = `_*Tidak ada absen berlangsung digrup ini!*_\n\nKetik ${usedPrefix}mulaiabsen untuk memulai absen!`
        conn.sendB(m.chat, caption, wm, null, [[await conn.trans(lang, 'Mulai Absen'), `${usedPrefix}mulaiabsen`]], m)
        throw false
    }
    delete conn.absen[id]
    m.reply(await conn.trans(lang, 'Absen dihapus'))
}
handler.help = ['deleteabsent']
handler.tags = ['absen']
handler.command = /^(absent?delete|deleteabsent?|absent?hapus|hapusabsent?|removed?absent?|absent?removed?)$/i

handler.group = true

module.exports = handler
