let handler = async (m, { jid, conn, usedPrefix, command, isOwner }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    let caption = `
${sa}${kki} Chat Terbanned ${kka}
${gx} Total : ${chats.length} Chat${chats ? '\n' + chats.map(([jid], i) => `
${gy} ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
${gy} ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : ''}
${sb}

${sa}${kki} Pengguna Terbanned ${kka}
${gx} Total : ${users.length} Pengguna${users ? '\n' + users.map(([jid], i) => `
${gy} ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
${gy} ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : ''}
${sb}
`.trim()
    conn.reply(m.chat, caption, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
}
handler.help = ['bannedlist']
handler.tags = ['info']
handler.command = /^list?ban(ned)?|ban(ned)?list?|daftarban(ned)?$/i

handler.owner = false

module.exports = handler

