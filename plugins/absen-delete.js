let handler = async (m, { conn, isAdmin, isOwner, usedPrefix }) => {
    if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
    let id = m.chat
    let lang = db.data.users[m.sender].language
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        let ca = `Tidak ada absen berlangsung digrup ini!` 
        let ca2 = `ketik ${usedPrefix}mulaiabsen untuk memulai absen`
        let capt = await conn.trans(lang, ca).catch(async _ => await conn.trans2(lang, ca)) 
        let capt2 = await conn.trans(lang, ca2).catch(async _ => await conn.trans2(lang, ca2)) 
        let captionn = '_*'+capt+'*_'+'\n\n'+capt2
        conn.sendB(m.chat, captionn, wm, null, [[await conn.trans(lang, 'Mulai Absen').catch(async _ => await conn.trans2(lang, 'Mulai Absen')), `${usedPrefix}mulaiabsen`]], m)
        throw false
    }
    delete conn.absen[id]
    m.reply(await conn.trans(lang, 'Absen dihapus').catch(async _ => await conn.trans2(lang, 'Absen dihapus')))
}
handler.help = ['deleteabsent']
handler.tags = ['absen']
handler.command = /^((d(e?l?e?t?e?)?|hapus|remove?d?)absent?)$/i

handler.group = true

module.exports = handler
