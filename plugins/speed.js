let { performance } = require('perf_hooks')
let { MessageType } = require('@adiwajshing/baileys-md')
let handler = async(m, { conn, usedPrefix, DevMode }) => {
    try {
        let old = performance.now()
        await m.reply('```Testing speed...```')
        let neww = performance.now()
        conn.sendButton(m.chat, neww - old + ' ms', wm, 0, [[`Menu`, `${usedPrefix}menu`]], m)
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
handler.help = ['ping']
handler.tags = ['info']

handler.command = /^(ping|speed)$/i
module.exports = handler
