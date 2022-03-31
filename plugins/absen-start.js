let handler = async (m, { conn, isAdmin, isOwner, usedPrefix, text, participants }) => {
    if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    let lang = db.data.users[m.sender].language
    if (!(id in conn.absen)) {
        let ca = `Tidak ada absen berlangsung digrup ini!` 
        let ca2 = `ketik ${usedPrefix}mulaiabsen untuk memulai absen`
        let capt = await conn.trans(lang, ca).catch(async _ => await conn.trans2(lang, ca)) 
        let capt2 = await conn.trans(lang, ca2).catch(async _ => await conn.trans2(lang, ca2)) 
        let captionn = '_*'+capt+'*_\n\n'+capt2
        conn.sendB(m.chat, captionn, wm, null, [[await conn.trans(lang, 'Mulai Absen').catch(async _ => await conn.trans2(lang, 'Mulai Absen')), `${usedPrefix}mulaiabsen`]], m)
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
