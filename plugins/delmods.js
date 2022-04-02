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
    if (json.includes(who)) throw `${await conn.getName(who)} belum moderator!`
    let index = json.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
    json.splice(index, 1)
    fs.writeFileSync('./src/moderator.json', JSON.stringify(json))
    let user = db.data.users[who]
    user.moderator = false
    user.moderatorTime = 0
    m.reply2(`${await conn.getName(who)} sekarang bukan moderator!`)
    delete require.cache[require.resolve('../config')]
    require('../config')
}
handler.help = ['delmods <@user>']
handler.tags = ['owner']
handler.command = /^(remove|hapus|-|del)mod?s?$/i

handler.rowner = true

module.exports = handler
