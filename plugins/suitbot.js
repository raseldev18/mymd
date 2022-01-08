let handler = async (m, { text, usedPrefix, command, conn }) => {
    let salah = `Pilihan yang tersedia\n\ngunting, kertas, batu\n\n${usedPrefix}${command} gunting\n\nkasih spasi!`
    if (!text) throw salah
    var astro = Math.random()

    if (astro < 0.34) {
        astro = 'batu'
    } else if (astro > 0.34 && astro < 0.67) {
        astro = 'gunting'
    } else {
        astro = 'kertas'
    }

    //menentukan rules
    if (text == astro) {
        conn.reply(`Seri!\nkamu: ${text}\nBot: ${astro}`)
    } else if (text == 'batu') {
        if (astro == 'gunting') {
            global.db.data.users[m.sender].money += 1000
            m.reply(`Kamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            conn.reply(`Kamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'gunting') {
        if (astro == 'kertas') {
            global.db.data.users[m.sender].money += 1000
            conn.reply(`Kamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            conn.reply(`Kamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else if (text == 'kertas') {
        if (astro == 'batu') {
            global.db.data.users[m.sender].money += 1000
            conn.reply(`Kamu menang! +Rp1000\nKamu: ${text}\nBot: ${astro}`)
        } else {
            conn.reply(`Kamu kalah!\nkamu: ${text}\nBot: ${astro}`)
        }
    } else {
        throw salah
    }
}
handler.help = ['suitbot']
handler.tags = ['game']
handler.command = /^(suitb(ot)?)$/i

module.exports = handler
