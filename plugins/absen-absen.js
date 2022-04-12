let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    let lang = db.data.users[m.sender].language
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        let caption = `_*Tidak ada absen berlangsung digrup ini!*_\n\nKetik ${usedPrefix}mulaiabsen untuk memulai absen!`
        conn.sendB(m.chat, caption, wm, null, [[await conn.trans(lang, 'Mulai Absen'), `${usedPrefix}mulaiabsen`]], m)
        throw false
    }
    let absen = conn.absen[id][1]
    const wasVote = absen.includes(m.sender)
    let caption1 = 'Kamu sudah absen!'
    if(wasVote) return conn.sendB(m.chat, caption1, wm, null, [[await conn.trans(lang, 'Cek Absen'), `${usedPrefix}cekabsen`]], m) 
    absen.push(m.sender)
    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let list = absen.map((v, i) => `${gy} ${i + 1}. ${conn.getName(v)}`).join('\n')
    let caption2 = `_*${await conn.trans(lang, `Tanggal: ${date}`)}*_
    ${conn.absen[id][2]}
${sa}${kki} *${await conn.trans(lang, `Daftar Absen`)}*
${gz}
${gx} ${await conn.trans(lang, `Total: ${absen.length}`)}
${list}
${gz}
${sb}`
    conn.sendB(m.chat, caption2, wm, null, [[await conn.trans(lang, 'Hadir'), `${usedPrefix}absen`], [await conn.trans(lang, 'Cek Absen'), `${usedPrefix}cekabsen`]], m, {mentions: conn.parseMention(caption2)})
}
handler.help = ['absent']
handler.tags = ['absen']
handler.command = /^(absent?|hadir|present?)$/i

handler.group = true

module.exports = handler
