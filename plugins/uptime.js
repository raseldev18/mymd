let handler = async (m) => {
let fetch = require('node-fetch')
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss')
let capt = `
*─────「 RUNTIME BOT 」─────*

Time : ${time}
Runtime : ${uptime}
${namabot}
`
await conn.sendTemplateButtonLoc(m.chat, text.trim(), wm, await(await require('node-fetch')(img)).buffer(), `Menu`, `#menu`, m)
}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(uptime|runtime)$/i

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}