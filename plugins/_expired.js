let handler = m => m
handler.before = async function (m) {
    if (m.isGroup && global.db.data.chats[m.chat].expired != 0) {
        if (new Date() * 1 >= global.db.data.chats[m.chat].expired) {
            this.reply(m.chat, `waktunya *@${this.user.jid.split('@')[0]}* untuk meninggalkan grup, jika ingin *Bot* stay di grup ini sewa bot ke\n*@${owner[0]}* atau ke nomor di bawah!`, null, {mentions: [this.user.jid, owner[0]+'@s.whatsapp.net']}).then(() => {
               // this.sendContact(m.chat, owner[0], this.getName(owner[0] + '@s.whatsapp.net')).then(() => {
                this.sendContactArray(m.chat, [[`${owner[0]}`, `${await this.getName(owner[0]+'@s.whatsapp.net')}`, `👑 Developer Bot `, `🚫 Don't call me 🥺`, `raselcomel18@gmail.com`, `🇮🇩 Indonesia`, `🚀 https://raselcomel.github.io/`, `👤 Gada pawang nih senggol dong 😔`], [`${this.user.jid.split('@')[0]}`, `${await this.getName(this.user.jid)}`, `🔥 Bot WhatsApp 🐣`, `📵 Don't spam/call me 😢`, `Nothing`, `🇮🇩 Indonesia`, `🚀 https://anu.rasell.repl.co/`, `🤖 Hanya bot biasa yang kadang suka eror ☺`]]).then(() => {
                    this.groupLeave(m.chat).then(() => {
                        global.db.data.chats[m.chat].expired = 0
                    })
                })
            })
        }
    }
}

module.exports = handler
