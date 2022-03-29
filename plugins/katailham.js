let handler = async(m) => {
let katailhamm = pickRandom(global.ilham)
      conn.sendBL(m.chat, katailhamm, wm, fla + `kata ilham`, [['Kata Ilham', '.katailham']], m)
}
handler.help = ['kata'].map(v => v + 'ilham')
handler.tags = ['quotes']
handler.command = /^(katailham)$/i

handler.limit = true

module.exports = handler


function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.ilham = [
"Nggak ada yang peduli denganmu di sosmed kecuali kamu cakep.",
"Sesimpel ini deh, sibuk itu palsu, semua tergantung prioritas.",
"Dia hanya menghargaimu, bukan mencintaimu.",
"Keadilan sosial hanya berlaku bagi warna negara yang good looking.",
"Jangan jadi pelangi untuk orang yang buta warna.",
"Dia yang tertidur nyenyak setelah mematahkan hatimu tidak pantas untuk kamu ingat.",
"Dia cuman bercanda, harusnya kamu ketawa, bukan malah jatuh cinta.",
"Jika tidak bisa mewarnai hidup seseorang, maka jangan pudarkan warna aslinya.",
"Cukup tahu namaku, jangan rupaku.",
"Sesuatu akan terasa berharga jika sudah kehilangan.",
"Jangan pernah mengeluh ketika kopimu dingin, ia pernah hangat, namun kau diamkan."
]
