let fs = require('fs')
let handler = async (m, { conn, args }) => {
    let lang = db.data.users[m.sender].language
    const json = JSON.parse(fs.readFileSync('./src/moderator.json'))
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    else who = args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    if(!args) return
    if(isNaN(args)) return await conn.trans(lang, 'Hanya angka!').catch(async _ => await conn.trans2(lang, 'Hanya angka!'))
    if (json.includes(who.split`@`[0])) throw `${await conn.getName(who)} sudah jadi moderator!`
    json.push(`${who.split`@`[0]}`)
    fs.writeFileSync('./src/moderator.json', JSON.stringify(json))
    let anu = `${await conn.getName(who)} sekarang jadi moderator!`
    let mod = await conn.trans(lang, anu).catch(async _ => await conn.trans2(lang, anu))
    m.reply(mod)
    delete require.cache[require.resolve('../config')]
    require('../config')
    let user = db.data.users[m.sender]
    user.moderator = true
    user.moderatorTime = args
}
handler.help = ['addmods [@user]']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)mo(ds)?$/i

handler.rowner = true

module.exports = handler
