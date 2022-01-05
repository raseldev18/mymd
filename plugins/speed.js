let { performance } = require('perf_hooks')
let { MessageType } = require('@adiwajshing/baileys-md')
let fetch = require('node-fetch')
let handler = async(m, { conn, command, usedPrefix, DevMode }) => {
    try {
        let old = performance.now()
        await conn.reply(m.chat, '_Testing speed..._', m)
        let neww = performance.now()
        conn.sendButtonLoc(m.chat, neww - old + ' milidetik 💬', wm, await(await fetch(fla + `${command}`)).buffer(), [[`Menu`, `${usedPrefix}menu`]], m)
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
