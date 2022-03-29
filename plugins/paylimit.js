let pajak = 0.02
let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
  let fail = `perintah ini buat ngasih Limit ke pengguna lain\n\ncontoh:\n${usedPrefix + command} @6285346545126 10\natau balas pesan doi dengan perintah: ${usedPrefix + command} 10`
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  else who = m.chat
  if (!who) {
    conn.reply(m.chat, fail, m, { contextInfo: { mentionedJid: ['6285346545126@s.whatsapp.net'] } })
    throw false
  }
  if (typeof global.db.data.users[who] == "undefined") {
    global.db.data.users[who] = {
      exp: 0,
      limit: 10,
      lastclaim: 0,
      registered: false,
      name: conn.getName(m.sender),
      age: -1,
      regTime: -1,
      afk: -1,
      afkReason: '',
      banned: false,
      level: 0,
      call: 0,
      role: 'Warrior V',
      autolevelup: false,
      pc: 0,
    }
  }
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) {
    conn.reply(m.chat, fail, m, { contextInfo: { mentionedJid: ['6285346545126@s.whatsapp.net'] } })
    throw false
  }
  if (isNaN(txt)) throw 'Hanya angka'
  let poin = parseInt(txt)
  let limit = poin
  let pjk = Math.ceil(limit * pajak)
  limit += pjk
  if (limit < 1) throw 'minimal 1'
  let users = global.db.data.users
  if (limit > users[m.sender].exp) throw 'Exp tidak mencukupi untuk mentransfer, ada pajaknya juga'
  users[m.sender].limit -= limit 
  users[who].limit += poin
  await conn.reply(m.chat, `(${-limit} Limit) + (${-pjk} Limit (Pajak 2%)) = ( ${-limit} Limit)`, m)
  await conn.fakeReply(m.chat, `Sukses transfer *${poin}* Limit`, who, m.text)
  await conn.sendB(who, `@${m.sender.split(`@`)[0]} telah memberikan Limit kepada anda sebesar ${poin} Limit, silahkan cek Balance kamu dengan mengetik *${usedPrefix}balance* atau klik button dibawah!`, wm, null, [[`Balance`, `${usedPrefix}balance`]], m, {mentions: [m.sender]})
  } catch {
    throw `@tag atau reply untuk ngasih Limit`
  }
}
handler.help = ['paylimit @user <jumlah>']
handler.tags = ['xp']
handler.command = /^payli?m?i?t?$/

module.exports = handler
