let { performance } = require('perf_hooks')
let { MessageType } = require('@adiwajshing/baileys-md')
let handler = async(m, { conn, usedPrefix, DevMode }) => {
    try {
        let old = performance.now()
        await m.reply('_Testing speed..._')
        let neww = performance.now()
        conn.sendButton(m.chat, neww - old + ' milidetik', wm, 0, [[`Menu`, `${usedPrefix}menu`]], m)
    } catch (e) {
        console.log(e)
        m.reply('Error!!')
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Speed.js error\nNo: *' + m.sender.split `@` [0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}
handler.help = ['speed']
handler.tags = ['info']

handler.command = /^(ping|speed)$/i
module.exports = handler
