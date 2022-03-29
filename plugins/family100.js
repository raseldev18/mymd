let fetch = require('node-fetch')
let winScore = 500
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.sendB(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', wm, null, [['Nyerah', 'nyerah']], this.game[id].msg)
        throw false
    }
    let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
    let caption = `
*Soal:* ${json.soal}

Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}

+${winScore} XP tiap jawaban benar
    `.trim()
    this.game[id] = {
        id,
        msg: await this.sendBL(m.chat, caption, 'Janga asal nyerah jawab aja dulu siapa tau ada yang benar\nby ' + wm, fla + 'family 100', [['Nyerah', ' ']], m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family(100)?$/i

module.exports = handler
