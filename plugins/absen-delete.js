let handler = async (m, { conn, isAdmin, isOwner, usedPrefix }) => {
    if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
    let id = m.chat
    let lang = db.data.users[m.sender].language
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        let ca = `Tidak ada absen berlangsung digrup ini!\n\nketik ${usedPrefix}mulaiabsen untuk memulai absen`
        let capt = await conn.trans(lang, ca).catch(async _ => await conn.trans2(lang, ca)) 
        conn.sendB(m.chat, capt, wm, null, [[await conn.trans(lang, 'Mulai Absen').catch(async _ => await conn.trans2(lang, 'Mulai Absen')), `${usedPrefix}mulaiabsen`]], m)
        throw false
    }
    delete conn.absen[id]
    m.reply(await conn.trans(lang, 'Absen dihapus').catch(async _ => await conn.trans2(lang, 'Absen dihapus')))
}
handler.help = ['hapusabsen']
handler.tags = ['absen']
handler.command = /^(d(e?l?e?t?e?)?|ha?pu?s)abs(en)?|abs(en)?(ha?pu?s|d(e?l?e?t?e?)?)$/i

handler.group = true

module.exports = handler
