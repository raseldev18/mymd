let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    let lang = db.data.users[m.sender].language
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        let ca = `Tidak ada absen berlangsung digrup ini!` 
        let ca2 = `ketik ${usedPrefix}mulaiabsen untuk memulai absen`
        let capt = await conn.trans(lang, ca).catch(async _ => await conn.trans2(lang, ca)) 
        let capt2 = await conn.trans(lang, ca2).catch(async _ => await conn.trans2(lang, ca2)) 
        let captionn = capt+'\n\n'+capt2
        conn.sendB(m.chat, captionn, wm, null, [[await conn.trans(lang, 'Mulai Absen').catch(async _ => await conn.trans2(lang, 'Mulai Absen')), `${usedPrefix}mulaiabsen`]], m)
        throw false
    }
    let absen = conn.absen[id][1]
    const wasVote = absen.includes(m.sender)
    let ud = 'Kamu sudah absen!'
    let uv = await conn.trans(lang, ud).catch(async _ => await conn.trans2(lang, ud))
    if(wasVote) return conn.sendB(m.chat, uv, wm, null, [[await conn.trans(lang, 'Cek Absen').catch(async _ => await conn.trans2(lang, 'Cek Absen')), `${usedPrefix}cekabsen`]], m) 
    absen.push(m.sender)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `${gy} ${i + 1}. ${conn.getName(v)}`).join('\n')
    let caption = `${await conn.trans(lang, `Tanggal: ${date}`).catch(async _ => await conn.trans2(lang, `Tanggal: ${date}`))}
    ${conn.absen[id][2]}
${sa}${kki} ${await conn.trans(lang, `Daftar Absen`).catch(async _ =>await conn.trans2(lang, `Daftar Absen`))} ${kka}
${gz}
${gx} ${await conn.trans(lang, `Total: ${absen.length}`).catch(async _ => await conn.trans2(lang, `Total: ${absen.length}`))}
${list}
${gz}
${sb}`
    conn.sendB(m.chat, caption, wm, null, [[await conn.trans(lang, 'Absen').catch(async _ => await conn.trans2(lang, 'Absen')), `${usedPrefix}absen`], [await conn.trans(lang, 'Cek Absen').catch(async _ => await conn.trans2(lang, 'Cek Absen')), `${usedPrefix}cekabsen`]], m, {mentions: conn.parseMention(caption)})
}
handler.help = ['absen']
handler.tags = ['absen']
handler.command = /^(abs(ent?)?|hadir|present?)$/i

handler.group = true

module.exports = handler
