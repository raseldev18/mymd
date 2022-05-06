async function handler(m, { command, usedPrefix }) {
    let lang = db.data.users[m.sender].language
    if (!db.data.settings[this.user.jid].anon) return m.reply(await this.trans(lang, `Fitur ini tidak aktif hubungi owner untuk mengaktifkannya!`))
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
    	case 'anon': 
        case 'anonymous': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
            await this.sendB(m.chat, '_Kamu sedang berada di dalam anonymous chat_', 'Mau keluar?', null, [['Leave', `${usedPrefix}leave`]], m)
            throw false
            }
 
            await this.sendB(m.chat, 'Temukan seseorang untuk mengobrol', 'Anon.Chat @0 Version', 0, [['Start Searching', '.start']], m, {mentions: ['0@s.whatsapp.net']})
            if (command == 'anon' || 'anonymous') break
        }
 
    	case 'send':
        case 'sendkontak':
        case 'sendcontact': {
            let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
            let room = Object.values(this.anonymous).find(room => room.check(who))
            if (!room) {
                await this.sendB(m.chat, '_Kamu tidak sedang berada di anonymous chat_', 'Mau cari patner chating?', null, [['Search Patner', `${usedPrefix}start`]])
                throw false
            }
            let other = room.other(m.sender)
            let name
            if (text) name = text
            else name = this.getName(m.sender)
            let number = who.split('@')[0]
            if (other) await this.sendB(other, 'Partner mengirim kontak kepadamu', 'Klik button dibawah untuk mengirim kontak juga', null, [['Send Contact', '.sendcontact']]).then(async _=> {
                await this.sendContact(other, number, name, m)
            })
            if (command === 'sendcontact' || 'sendkontak' || 'send') break
        }
 
        case 'next':
        case 'skip': {   
            if (!Object.values(this.anonymous).find(room => room.check(m.sender))) {
                this.sendB(m.chat, '_Kamu tidak sedang berada di anonymous chat_', 'Mau cari patner chating?', null, [['Start', `${usedPrefix}start`]])
                throw false
            }
            let other = room.other(m.sender)
            if (other) await this.sendB(other, '_Partner meninggalkan chat_', 'Mau cari patner chat lagi?', null, [['Start Again', `${usedPrefix}start`]])
            delete this.anonymous[room.id]
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendB(room.a, '_Partner baru ditemukan!_', 'Silahkan chatingan🤗', null, [['Leave', '.leave'], ['Next', '.next']], m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendB(room.b, '_Partner baru ditemukan!_', 'Silahkan chatingan🤗', null, [['Leave', '.leave'], ['Next', '.next']], m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendB(m.chat, '_Mencari partner baru..._', 'Kalo bosan menunggu, klik button di bawah untuk keluar!', null, [['Leave', '.leave']], m)
                if (command == 'skip' || 'next') break
            }
        }
        case 'stop':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) {
                await this.sendB(m.chat, '_Kamu tidak sedang berada di anonymous chat_', 'Mau cari patner chating?', null, [['Start', `${usedPrefix}start`]], m)
                throw false
            }
            this.sendB(m.chat, '_Kamu meninggalkan room anonymous chat_', 'Mau main anonymous lagi?', null, [['Ya', `${usedPrefix}start`], ['Tidak', `${usedPrefix}say Ok terimakasih telah menggunakan Anonymous Chat Bot, kalo kamu mau main lagi bisa klik button *Ya* di atas!`]], m)
            let other = room.other(m.sender)
            if (other) await this.sendB(other, '_Partner meninggalkan chat_', 'Mau cari patner chat lagi?', null, [['Start Again', `${usedPrefix}start`]], m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'search':
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
                await this.sendB(m.chat, '_Kamu masih berada di dalam anonymous chat_', 'Mau keluar?', null, [['Leave', `${usedPrefix}leave`]], m)
                throw false
            }
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
            	await this.sendB(room.a, '_Partner ditemukan!_', 'Silahkan chatingan🤗', null, [['Leave', '.leave'], ['Next', '.next']], m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendB(room.b, '_Partner ditemukan!_', 'Silahkan chatingan🤗', null, [['Leave', '.leave']  ['Next', '.next']], m)
 
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendB(m.chat, '_Menunggu partner..._', 'Kalo bosan menunggu, klik di bawah untuk keluar!', null, [['Leave', `${usedPrefix}leave`]], m)
            }
            break
        }
    }
}
handler.help = ['anonymous', 'start', 'leave', 'next', 'sendcontact']
handler.tags = ['anonymous']
handler.command = ['anonymous', 'anon', 'start', 'leave', 'stop', 'search', 'skip', 'send', 'sendkontak', 'sendcontact']

handler.private = true

module.exports = handler 
