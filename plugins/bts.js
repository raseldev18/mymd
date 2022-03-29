let handler = async (m, { conn, usedPrefix, command }) => {
let res = await fetch('https://raw.githubusercontent.com/irwanx/db/master/kpop/batues.txt')
let txt = await res.text()

let arr = txt.split('\n')
let cita = arr[Math.floor(Math.random() * arr.length)]
await conn.sendBI(m.chat, `Nihh batuessnya @${m.sender.split(`@`)[0]}`, wm, cita, [[`Next`, `${usedPrefix}${command}`]], m, {jpegThumbnail: await(await fetch(cita)).buffer(), mentions:[m.sender] })
}
handler.tags = ['random']
handler.help = ['bts']
handler.command = /^(bts)$/i

handler.limit = true

module.exports = handler
//by rasel:v
