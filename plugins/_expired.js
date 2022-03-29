let handler = m => m
handler.before = async function (m) {

    if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
        if (new Date() * 1 >= global.db.data.chats[m.chat].expired) {
            this.reply(m.chat, `waktunya *@${this.user.jid.split('@')[0]}* untuk meninggalkan grup, jika ingin *Bot* stay di grup ini sewa bot ke\n*@${owner[0]}* atau ke nomor di bawah!`, null, {mentions: [this.user.jid, owner[0]+'@s.whatsapp.net']}).then(() => {
                this.sendContactS(m.chat, owner[0], this.getName(owner[0] + '@s.whatsapp.net')).then(() => {
                    this.groupLeave(m.chat).then(() => {
                        global.db.data.chats[m.chat].expired = 0
                    })
                })
            })
        }
    }
}

module.exports = handler
