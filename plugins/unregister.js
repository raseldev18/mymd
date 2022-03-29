const { createHash } = require('crypto')
let handler = async function (m, { args, conn }) {
 // if (!isRegister) throw `Kamu tidak terdaftar di database bot, jangan aneh² deh mau gua ban?`
  if (!args[0]) throw 'Serial Number kosong\nMager Nulis SN mnding gausah unreg wkkw<3'
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw 'Serial Number salah'
  user.registered = false
  const suk = `Sukses unreg`
  const cap = `Kakak jahat knp unreg sih 😣`
  await m.reply(suk) 
  await conn.reply(m.sender, cap, m) 
}
handler.help = ['unregister <SN>']
handler.tags = ['xp']
handler.command = /^unreg(is(ter)?)?$/i

handler.register = true

module.exports = handler

