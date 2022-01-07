let timeout = 90000
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, text, isOwner }) => {
    if (!m.isGroup) {
        if (!isOwner) {
            dfail('group', m, conn)
            throw false
        }
    }
    conn.suit = conn.suit ? conn.suit : {}
    if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw 'selesaikan suit mu yang sebelumnya'
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    if (!who) return conn.reply(m.chat, `tag atau mention seseorang.\n\ncontoh:\n${usedPrefix}suit @${m.sender.split`@`[0]} ${db.data.users[m.sender].exp}`, m)
    if (who === m.sender) throw 'tidak bisa menantang diri sendiri!'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) return conn.reply(m.chat, `uhm.. mau taruhan berapa XP?\n\ncontoh:\n${usedPrefix}suit @${m.sender.split`@`[0]} ${db.data.users[m.sender].exp}`, m)
    if (isNaN(txt)) throw 'XP harus angka!'
    let poin = parseInt(txt)
    if (poin < 1) throw 'minimal 1 XP!'
    if (db.data.users[m.sender].exp < poin) {
        throw `XP kamu tidak cukup!`
    }
    if (db.data.users[who].exp < poin) {
        throw `XP ${conn.getName(who)} tidak cukup!`
    }
    let poin_lose = poin
    if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(who))) throw `yang kamu tag sedang bermain!`
    let id = 'suit_' + new Date() * 1
    let caption = `
*Suit Game*

@${m.sender.split`@`[0]} menantang @${who.split`@`[0]} untuk bermain suit

@${m.sender.split`@`[0]} bertaruh sebanyak ${poin} XP,
menang: +${poin} XP
kalah: -${poin} XP

silahkan @${who.split`@`[0]} ketik Y untuk bermain, ketik N untuk menolaknya
`.trim()
    conn.suit[id] = {
        id: id,
        p: m.sender,
        p2: who,
        status: 'wait',
        chat: await conn.sendButtonLoc(m.chat, caption, wm, await(await fetch(fla + 'suit challenge')).buffer(), [['Y', 'Y'], ['N', 'N']], m, 0, {
           contextInfo: {
        mentionedJid: [m.sender, who] }}),
        waktu: setTimeout(async () => {
            if (conn.suit[id]) await conn.reply(m.chat, `_Waktu suit habis_`, conn.suit[id].chat)
            delete conn.suit[id]
        }, timeout), poin, poin_lose, timeout
    }
}
handler.tags = ['game']
handler.help = ['suit'].map(v => v + ' [@tag] <jumlah xp>')
handler.command = /^(suit)$/i

handler.group = true

module.exports = handler
