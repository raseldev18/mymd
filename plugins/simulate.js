let handler = async (m, { conn, args: [event], text }) => {
    let mentions = text.replace(event, '').trimStart()
    let who = mentions ? conn.parseMention(mentions) : []
    let participants = who.length ? who : [m.sender]
    let action = false
    switch (event.toLowerCase()) {
        case 'add':
        case 'invite':
        caae 'w':
        case 'wel':
        case 'welcome':
            if (!db.data.chats[m.chat].welcome) return await conn.sendButton(m.chat, 'welcome belum diaktikan!', wm, 0, [['aktifkan', '.1 welcome']], m)
            action = 'add'
            break
        case 'bye':
        case 'kick':
        case 'leave':
        case 'remove':
            if (!db.data.chats[m.chat].welcome) return await conn.sendButton(m.chat, 'welcome belum diaktikan!', wm, 0, [['aktifkan', '.1 bye']], m)
            action = 'remove'
            break
        case 'promote':
            if (!db.data.chats[m.chat].welcome) return await conn.sendButton(m.chat, 'detect belum diaktikan!', wm, 0, [['aktifkan', '.1 detect']], m)
            action = 'promote'
            break
        case 'demote':
            if (!db.data.chats[m.chat].welcome) return await conn.sendButton(m.chat, 'detect belum diaktikan!', wm, 0, [['aktifkan', '.1 detect']], m)
            action = 'demote'
            break
        case 'delete':
            if (db.data.chats[m.chat].delete) return await conn.sendButton(m.chat, 'delete is active!', wm, 0, [['matikan', '.1 antidelete']], m)
            deleted = m
            break
        default: throw `daftar event: add, bye, promote, demote, delete`
    }
    if (action) return conn.onParticipantsUpdate({
        jid: m.chat,
        participants,
        action
    })
    return conn.onDelete(m)
}
handler.help = ['simulasi <event> [@tag]']
handler.tags = ['group']
handler.command = /^simula(si|te)?$/i

module.exports = handler

