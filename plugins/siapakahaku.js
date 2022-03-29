let timeout = 120000
let poin = 500
let handler = async (m, { conn, command, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.siapakahaku[id][0])
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}who untuk bantuan
Bonus: ${poin} XP
`.trim()
    conn.siapakahaku[id] = [
        await conn.sendBL(m.chat, caption, wm, fla + `siapakah aku`, [['Bantuan', '.who']], m),
        json, poin,
        setTimeout(async () => {
            if (conn.siapakahaku[id]) await conn.sendB(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, wm, null, [[`Siapakah Aku`, `${usedPrefix}siapakahaku`]], conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapa(kah)?aku/i

module.exports = handler
