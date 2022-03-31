let fs = require('fs')
let handler = async (m, { conn, args }) => {
    let lang = db.data.users[m.sender].language
    const json = JSON.parse(fs.readFileSync('./src/moderator.json'))
    try {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    else who = args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    if (!args[0]) return m.reply(await conn.trans(lang, 'Angkanya mana?').catch(async _ => await conn.trans2(lang, 'Angkanya mana?')))
    if (isNaN(args)) return await conn.trans(lang, 'Hanya angka, mewakili hari!').catch(async _ => await conn.trans2(lang, 'Hanya angka, mewakili hari!'))
    let ohh = `${await conn.getName(who)} sudah jadi moderator!`
    let sdh = await conn.trans(lang, ohh).catch(async _ => await conn.trans2(lang, ohh))
    if (json.includes(who.split`@`[0])) throw m.reply(sdh)
    json.push(`${who.split`@`[0]}`)
    fs.writeFileSync('./src/moderator.json', JSON.stringify(json))
    let anu = `${await conn.getName(who)} sekarang jadi moderator!`
    let mod = await conn.trans(lang, anu).catch(async _ => await conn.trans2(lang, anu))
    m.reply(mod)
    delete require.cache[require.resolve('../config')]
    require('../config')
    let user = db.data.users[m.sender]
    user.moderator = true
    user.moderatorTime = `${args[0]}`
    } catch(e) {
      return m.reply(await conn.trans(lang, '@tag atau balas pesan user').catch(async _ => await conn.trans2(lang, '@tag atau balas pesan user')))
      console.log(e)
  }
}
handler.help = ['addmods [@user]']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)mo(ds)?$/i

handler.rowner = true

module.exports = handler
