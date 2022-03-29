let fs = require('fs')
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, command }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let user = global.db.data.users[who]
let blnc = `${sa}${kki} BALANCE ${kka}
${gy} Name: ${zt}${user.name}${zt}
${gy} Limit: ${zt}${user.limit}${zt}
${gy} Money: ${zt}${user.money}${zt}
${gy} Exp: ${zt}${user.exp}${zt}
${gy} Level: ${zt}${user.level}${zt}
${gy} Role: ${zt}${user.role}${zt}
${sb}`
 conn.sendBL(m.chat, blnc, wm, fla + `${command} ${user.name}`, [[`Menu`,`${usedPrefix}menu`]], m) 
}
handler.help = ['balance', 'balance <@user>']
handler.tags = ['xp']
handler.command = /^(balance)$/i

module.exports = handler
