let poin = 500
let timeout = 120000
let handler = async (m, { conn, usedPrefix, command }) => {
    conn.susunkata = conn.susunkata ? conn.susunkata : {}
    let id = m.chat
    if (id in conn.susunkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susunkata[id][0])
        throw false
    }
    let res = await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/susunkata.json')
    if (!res.ok) throw eror
    let data = await res.json()
    let json = data[Math.floor(Math.random() * data.length)]
    let caption = `
${json.soal}

Tipe: ${json.tipe}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}suka untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.susunkata[id] = [
        await conn.sendBL(m.chat, caption, wm, fla + `susun kata`, [['Bantuan', '.suka']], m),
        json, poin,
        setTimeout(async () => {
            if (conn.susunkata[id]) await conn.sendB(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, wm, null, [['Susun Kata', '.susunkata']], conn.susunkata[id][0])
            delete conn.susunkata[id]
        }, timeout)
    ]
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata/i

module.exports = handler
