let handler = async (m, { conn, usedPrefix, command }) => {
let res = await fetch('https://raw.githubusercontent.com/irwanx/db/master/random/cecan.txt')
let txt = await res.text()
let arr = txt.split('\n')
let cita = arr[Math.floor(Math.random() * arr.length)]
await conn.sendBI(m.chat, `Nihh cecanya @${m.sender.split(`@`)[0]}`, wm, cita, [[`Next`, `${usedPrefix}${command}`]], m, {fileLength: fsx, jpegThumbnail: await(await fetch(thumbx)).buffer(), mentions: [m.sender] })
}
handler.tags = ['random']
handler.help = ['cecan']
handler.command = /^(cecan)$/i

handler.limit = true

module.exports = handler
