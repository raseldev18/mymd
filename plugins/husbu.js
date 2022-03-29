let handler = async (m, { conn, usedPrefix, command }) => {
let res = await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/husbu.txt')
let txt = await res.text()

let arr = txt.split('\n')
let cita = arr[Math.floor(Math.random() * arr.length)]
  await conn.sendBI(m.chat, `Nihh husbunya @${m.sender.split('@')[0]}`, wm, cita, [[`Next`, `${usedPrefix}${command}`]], m, {mentions: [m.sender], jpegThumbnail: await(await fetch(cita)).buffer()})
}
handler.tags = ['anime']
handler.help = ['husbu']
handler.command = /^(husbu)$/i

handler.register = true
handler.limit = true

module.exports = handler
