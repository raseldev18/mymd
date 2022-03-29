const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Kamu sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `contoh:\n*${usedPrefix + command} rasel.18*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'Umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 50) throw 'Umur terlalu tua'
  if (age < 5) throw 'Bayi bisa ngetik sesuai format bjir ._., tapi gatau juga bocil skrg epic² pasti anak ngep ngep:v'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  let sn = createHash('md5').update(m.sender).digest('hex')
  conn.sendBL(m.chat, `
*Successful Registration*

${sa}${kki} *Info User* ${kka}
${gy} ${zc}Nama${zc}   : ${name}
${gy} ${zc}Umur${zc}   : ${age} tahun
${gy} ${zc}Status${zc} : Terdaftar √
${gy} ${zc}Hadiah${zc} : ${prems.includes(m.sender.split`@`[0]) ? '✅ Silahkan chat owner untuk claim hadiah' : '❌ Bukan User Premium'}
${sb}
`.trim(), wm, pp, [[`Profile`,`${usedPrefix}profile`], [`Cek SN`, `.sn`]], m) 
}
handler.help = ['daftar', 'register'].map(v => v + ' <name>.<age>')
handler.tags = ['xp']

handler.command = /^(daftar|reg(is(ter)?)?)$/i

module.exports = handler
