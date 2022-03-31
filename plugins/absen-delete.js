let handler = async (m, { conn, isAdmin, isOwner, usedPrefix }) => {
    if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
    let id = m.chat
    let lang = db.data.users[m.sender].language
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        let ca = `Tidak ada absen berlangsung digrup ini`
        let cb = `Ketik ${usedPrefix}mulaiabsen untuk memulai absen!`
        let cc = await conn.trans(lang, ca).catch(async _ => await conn.trans2(lang, ca))
        let cd = await conn.trans(lang, cb).catch(async _ => await conn.trans2(lang, cb)) 
        let capt = '_*'+cc+'*_\n\n'+cd
        conn.sendB(m.chat, capt, wm, null, [[await conn.trans(lang, 'Mulai Absen').catch(async _ => await conn.trans2(lang, 'Mulai Absen')), `${usedPrefix}mulaiabsen`]], m)
        throw false
    }
    delete conn.absen[id]
    m.reply(await conn.trans(lang, 'Absen dihapus').catch(async _ => await conn.trans2(lang, 'Absen dihapus')))
}
handler.help = ['deleteabsent']
handler.tags = ['absen']
handler.command = /^(absent?delete|deleteabsent?|absent?hapus|hapusabsent?|removed?absent?|absent?removed?)$/i

handler.group = true

module.exports = handler
