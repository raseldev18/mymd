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
    if (!args[0]) throw `Angakanya mana?`
    if (isNaN(args[0])) throw `Hanya angka, mewakili hari!`
    if (json.includes(who.split`@`[0])) throw `${await conn.getName(who)} sudah moderator!`
    json.push(`${who.split`@`[0]}`)
    fs.writeFileSync('./src/moderator.json', JSON.stringify(json))
    let jumlahHari = 86400000 * args[1]
    let now = new Date() * 1
    if (now < global.db.data.users[who].moderatorTime) global.db.data.users[who].moderatorTime += jumlahHari
       else global.db.data.users[who].moderatorTime = now + jumlahHari
    let user = db.data.users[who]
    user.moderator = true
    user.moderatorTime = `${args[0]}`
    m.reply2(`${await conn.getName(who)} sekarang adalah moderator, ${msToDate(global.db.data.users[who].moderatorTime - now)}`)
    delete require.cache[require.resolve('../config')]
    require('../config')
}
handler.help = ['addmods <day> <@user>']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)mod?s?$/i

handler.rowner = true

module.exports = handler

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " hari " + hours + " jam " + minutes + " menit";
    // +minutes+":"+sec;
}
