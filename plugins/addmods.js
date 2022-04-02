let fs = require('fs')
let handler = async (m, { conn, args }) => {
    const json = JSON.parse(fs.readFileSync('./src/moderator.json'))
    try {
    var who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
       else who = args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
        } catch(e) {
            throw `@tag atau balas user!`
            }
    if (!args[0]) throw `Masukan angka untuk menentukan durasi!`
    if (isNaN(args[0])) throw `Hanya angka, mewakili hari!`
    if (json.includes(who.split`@`[0])) throw `${await conn.getName(who)} sudah moderator!`
    json.push(`${who.split`@`[0]}`)
    fs.writeFileSync('./src/moderator.json', JSON.stringify(json))
    m.reply2(`${await conn.getName(who)} sekarang adalah moderator`)
    delete require.cache[require.resolve('../config')]
    require('../config')
    let user = db.data.users[who]
    user.moderator = true
    user.moderatorTime = args[0]
}
handler.help = ['addmods <day> <@user>']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)mod?s?$/i

handler.rowner = true

module.exports = handler
