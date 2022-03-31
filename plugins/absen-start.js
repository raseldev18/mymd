let handler = async (m, { conn, isAdmin, isOwner, usedPrefix, text, participants }) => {
    if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    let lang = db.data.users[m.sender].language
    if (id in conn.absen) {
        let ms = `Masih ada absen di chat ini!\n\nketik ${usedPrefix}hapusabsen untuk menghapus absen`
        let msh = await conn.trans(lang, ms).catch(async _ => await conn.trans2(lang, ms))
        conn.sendB(m.chat, msh, wm, null, [[await conn.trans(lang, 'Hapus Absen').catch(async _ => await conn.trans2(lang, 'Hapus Absen')), `${usedPrefix}hapusabsen`]], m)
        throw false
    }
    let hid = await conn.groupMetadata(m.chat)
    let amu = await conn.trans(lang, 'Absen dimulai').catch(async _ => await conn.trans2(lang, 'Absen dimulai'))
    conn.absen[id] = [   
        conn.sendB(m.chat, amu, wm, null, [[await conn.trans(lang, 'Absen').catch(async _ => await conn.trans2(lang, 'Absen')), `${usedPrefix}absen`]], m, {mentions: hid.participants.map(a => a.id)}),
        [],
        text
    ]
}
handler.help = ['mulaiabsen [teks]']
handler.tags = ['absen']
handler.command = /^(start|mulai)absen|absen(start|mulai)$/i

handler.group = true

module.exports = handler
