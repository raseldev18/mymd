let handler = async(m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = +new Date
    user.afkReason = text
    conn.sendB(m.chat, `*AFK MODE*\n\n${conn.getName(m.sender)} sekarang AFK${text ? ': ' + text : ''}`, wm, null, [[`Menu`, `${usedPrefix}menu`]], m)
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

module.exports = handler
