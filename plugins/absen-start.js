let handler = async (m, { conn, isAdmin, isOwner, usedPrefix, text, participants }) => {
    if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    let lang = db.data.users[m.sender].language
    if (id in conn.absen) {
        let caption = `Masih ada absen di digrup ini!\n\nKetik ${usedPrefix}hapusabsen untuk menghapus absen!`
        conn.sendB(m.chat, caption, wm, null, [[await conn.trans(lang, 'Hapus Absen'), `${usedPrefix}hapusabsen`]], m)
        throw false
    }
    let hid = await conn.groupMetadata(m.chat)
    let amu = await conn.trans(lang, 'Absen dimulai').catch(async _ => await conn.trans2(lang, 'Absen dimulai'))
    conn.absen[id] = [   
        conn.sendB(m.chat, amu, wm, null, [[await conn.trans(lang, 'Hadir'), `${usedPrefix}absen`]], m, {mentions: hid.participants.map(a => a.id)}),
        [],
        text
    ]
}
handler.help = ['startabsent <text>']
handler.tags = ['absen']
handler.command = /^(start?absent?|absent?start?|mulaiabsent?|absent?mulai)$/i

handler.group = true

module.exports = handler
