let handler  = async (m, { conn, usedPrefix, command }) => {
let res = await fetch('https://raw.githubusercontent.com/irwanx/db/master/kata-kata/fiersa-besari.txt')
let txt = await res.text()

let arr = txt.split('\n')
let cita = arr[Math.floor(Math.random() * arr.length)]

   await conn.sendBL(m.chat, cita, wm, fla + `fiersa besari`, [[`Fiersa Besari`, `${usedPrefix + command}`]], m)
}
handler.help = ['fiersabesari']
handler.tags = ['quotes']
handler.command = /^(fiersa(besari)?)$/i

handler.limit = true

module.exports = handler
