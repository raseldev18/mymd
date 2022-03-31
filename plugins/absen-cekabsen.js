let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    let lang = db.data.users[m.sender].language
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        let ca = `Tidak ada absen berlangsung digrup ini!` 
        let ca2 = `ketik ${usedPrefix}mulaiabsen untuk memulai absen`
        let capt = await conn.trans(lang, ca).catch(async _ => await conn.trans2(lang, ca)) 
        let capt2 = await conn.trans(lang, ca2).catch(async _ => await conn.trans2(lang, ca2)) 
        let captionn = '_*'+capt+'*_\n\n'+capt2
        conn.sendB(m.chat, captionn, wm, null, [[await conn.trans(lang, 'Mulai Absen').catch(async _ => await conn.trans2(lang, 'Mulai Absen')), `${usedPrefix}mulaiabsen`]], m)
        throw false
    }
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `${gy} ${i + 1}. ${conn.getName(v)}`).join('\n')
    let caption = `_*${await conn.trans(lang, `Tanggal: ${date}`).catch(async _ => await conn.trans2(lang, `Tanggal: ${date}`))}*_
    ${conn.absen[id][2]}
${sa}${kki} *${await conn.trans(lang, `Daftar Absen`).catch(async _ =>await conn.trans2(lang, `Daftar Absen`))}* ${kka}
${gz}
${gx} ${await conn.trans(lang, `Total: ${absen.length}`).catch(async _ => await conn.trans2(lang, `Total: ${absen.length}`))}
${list}
${gz}
${sb}`
    conn.sendB(m.chat, caption, wm, null, [[await conn.trans(lang, 'Absen').catch(async _ => await conn.trans2(lang, 'Absen')), `${usedPrefix}absen`], [await conn.trans(lang, 'Hapus Absen').catch(async _ => await conn.trans2(lang, 'Hapus Absen')), `${usedPrefix}hapusabsen`]], m, { mentions: conn.parseMention(caption) })
}
handler.help = ['cekabsen']
handler.tags = ['absen']
handler.command = /^ch?ekabs(ent?)?$/i

handler.group = true

module.exports = handler
