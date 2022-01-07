let handler = m => m

handler.before = async function (m) {
    this.suit = this.suit ? this.suit : {}
    if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
    let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
    if (room) {
        let win = ''
        let tie = false
        if (m.sender == room.p2 && /^(y(es)?|n(o)?)$/i.test(m.text) && room.status == 'wait') {
            if (/^(n(o)?)$/i.test(m.text)) {
                this.reply(m.chat, `@${room.p2.split`@`[0]} menolak suit, suit dibatalkan`, m)
                delete this.suit[room.id]
                return !0
            }
            room.status = 'play'
            room.asal = m.chat
            clearTimeout(room.waktu)
            m.reply(`
pesan telah dikirimkan ke chat

@${room.p.split`@`[0]} dan @${room.p2.split`@`[0]}

silahkan jawab di chat masing"

wa.me/${this.user.jid.split`@`[0]}`.trim())
            let capt = `silahkan ketik gunting/batu/kertas atau klik tombol dibawah`
            if (!room.pilih) this.sendButton(room.p, capt, wm, false, [['✌️', '✌️'], ['✊', '✊'], ['🖐️', '🖐️']])
            if (!room.pilih2) this.sendButton(room.p2, capt, wm, false, [['✌️', '✌️'], ['✊', '✊'], ['🖐️', '🖐️']])
            room.waktu_milih = setTimeout(async () => {
                if (!room.pilih && !room.pilih2) this.reply(m.chat, `kedua pemain tidak niat main, suit berakhir`)
                else if (!room.pilih || !room.pilih2) {
                    win = !room.pilih ? room.p2 : room.p
                    this.reply(m.chat, `@${(room.pilih ? room.p2 : room.p).split`@`[0]} tidak memilih, suit berakhir`, m)
                    db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
                    db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
                }
                delete this.suit[room.id]
                return !0
            }, room.timeout)
        }
        let jwb = m.sender == room.p
        let jwb2 = m.sender == room.p2
        let g = /gunting|✌️|✌🏻|✌🏼|✌🏽|✌🏾|✌🏿|✌🏿/i
        let b = /batu|✊|✊🏻|✊🏼|✊🏽|✊🏾|✊/i
        let k = /kertas|🖐️|🖐🏻|🖐🏼|🖐🏽|🖐🏾|🖐🏿/i
        let reg = /^(gunting|batu|kertas|✌️|✌🏻|✌🏼|✌🏽|✌🏾|✌🏿|✌🏿|✊|✊🏻|✊🏼|✊🏽|✊🏾|✊|🖐️|🖐🏻|🖐🏼|🖐🏽|🖐🏾|🖐🏿)$/i
        if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
            room.pilih = reg.exec(m.text.toLowerCase())[0]
            room.text = m.text
            m.reply(`kamu telah memilih ${m.text} ${!room.pilih2 ? `\n\nmenunggu lawan memilih` : ''}`)
            if (!room.pilih2) this.reply(room.p2, 'lawan sudah memilih\nsekarang giliran kamu', 0)
        }
        if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
            room.pilih2 = reg.exec(m.text.toLowerCase())[0]
            room.text2 = m.text
            m.reply(`kamu telah memilih ${m.text} ${!room.pilih ? `\n\nmenunggu lawan memilih` : ''}`)
            if (!room.pilih) this.reply(room.p, 'lawan sudah memilih\nsekarang giliran kamu', 0)
        }
        let stage = room.pilih
        let stage2 = room.pilih2
        if (room.pilih && room.pilih2) {
            clearTimeout(room.waktu_milih)
            if (b.test(stage) && g.test(stage2)) win = room.p
            else if (b.test(stage) && k.test(stage2)) win = room.p2
            else if (g.test(stage) && k.test(stage2)) win = room.p
            else if (g.test(stage) && b.test(stage2)) win = room.p2
            else if (k.test(stage) && b.test(stage2)) win = room.p
            else if (k.test(stage) && g.test(stage2)) win = room.p2
            else if (stage == stage2) tie = true
            this.reply(room.asal, `
*Suit Game*${tie ? '\nSERI' : ''}
(${room.text}) @${room.p.split`@`[0]} ${tie ? '' : room.p == win ? ` Menang \n+${room.poin} XP` : ` Kalah \n-${room.poin_lose} XP`}
(${room.text2}) @${room.p2.split`@`[0]} ${tie ? '' : room.p2 == win ? ` Menang \n+${room.poin} XP` : ` Kalah \n-${room.poin_lose} XP`}
`.trim(), 0, { contextInfo: { mentionedJid: [room.p, room.p2] } })
            if (!tie) {
                db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
                db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose

            }
            delete this.suit[room.id]
        }
    }
    return !0
}

module.exports = handler
