let handler = async (m, { conn, usedPrefix }) => {
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
${sa}${kki} *${await conn.trans(lang, `Daftar Absen`).catch(async _ =>await conn.trans2(lang, `Daftar Absen`))} ${kka}*
${gz}
${gx} ${await conn.trans(lang, `Total: ${absen.length}`).catch(async _ => await conn.trans2(lang, `Total: ${absen.length}`))}
${list}
${gz}
${sb}`
    conn.sendB(m.chat, caption, wm, null, [[await conn.trans(lang, 'Hadir').catch(async _ => await conn.trans2(lang, 'Hadir')), `${usedPrefix}absen`], [await conn.trans(lang, 'Hapus Absen').catch(async _ => await conn.trans2(lang, 'Hapus Absen')), `${usedPrefix}hapusabsen`]], m, { mentions: conn.parseMention(caption) })
}
handler.help = ['checkabsent']
handler.tags = ['absen']
handler.command = /^(ch?ec?kabsent?|absent?ch?ec?k)$/i

handler.group = true

module.exports = handler
