const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let fetch = requier('node-fetch')
let handler = async function (m, { text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Kamu sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `contoh:\n*${usedPrefix + command} nama.umur*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'Umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 50) throw 'Lu dah tua anjing'
  if (age < 5) throw 'Mau diban?'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
conn.sendButton(m.chat, `*──「 Successful Registration 」──*
                 
╭─• 〘 INFO 〙
│➥ Nama: ${name}
│➥ Umur: ${age} Tahun
│➥ Hadiah: ${prems.includes(who.split`@`[0]) ? '✅ Silahkan chat owner untuk claim hadiah' : '❌ Bukan User Premium'}
╰──────•

*SN* telah di kirim ke chat pribadi 
Tidak menerima *SN?* silahkan ketik *${usedPrefix}sn* untuk mendapatkan SERIAL NUMBER
`.trim(), wm, 0, [[`Menu`,`${usedPrefix}menu`]], m)
  m.reply(`Silahkan bintangi\n\n${sn}`, who) 
}
handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp', 'main']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler
