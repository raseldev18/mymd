let handler = m => m
handler.before = async function (m) {
    let hid = await conn.groupMetadata(m.chat)
    if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
        if (new Date() * 1 >= global.db.data.chats[m.chat].expired) {
            this.reply(m.chat, `Waktunya *@${this.user.jid.split('@')[0]}* untuk meninggalkan grup, jika ingin *Bot* stay di grup ini sewa bot ke *Owner* di bawah!`, null, { mentions: hid.participants.map(a => a.id) }).then(() => {
                this.sendContact(m.chat, owner[0], this.getName(owner[0] + '@s.whatsapp.net')).then(() => {
                    this.groupLeave(m.chat).then(() => {
                        global.db.data.chats[m.chat].expired = 0
                    })
                })
            })
        }
    }
}

module.exports = handler

