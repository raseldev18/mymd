let handler = async (m, { conn, args: [event], text, usedPrefix, command }) => {
  let evn = `${m.isGroup ? 'Welcome\nBye\nDelete\nPromote\nDemote' : 'Delete'}`
  let ero = evn.split`\n`
  let row = []
  for (let eror of ero) {
      row.push({
        title: "Simulate " + eror,
        rowId: usedPrefix + command + ' ' + eror.toLowerCase(),
      })
  }
  if (!event) return conn.sendListM(m.chat, `${set.sa} S I M U L A T E\n`, `${set.sb} *Example* : ${usedPrefix + command} ${ero.getRandom()}`, set.wm, row, m) 
  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender == conn.user.jid ? m.sender : m.quoted.sender : m.sender
  let participants = [user]
  let action = false
  switch (event.toLowerCase()) {
      case 'add':
      case 'invite':
      case 'welcome':
          action = 'add'
          break
      case 'bye':
      case 'kick':
      case 'leave':
      case 'remove':
          action = 'remove'
          break
      case 'promote':
      case 'admin':
          action = 'promote'
          break
      case 'demote':
      case 'unadmi ':
          action = 'demote'
          break
      case 'delete':
      case 'del':
          var deleted = m
          break
      default:
          return conn.sendListM(m.chat, `${set.sa} S I M U L A T E\n`, `${set.sb} *Example* : ${usedPrefix + command} ${ero.getRandom()}`, set.wm, row, m) 
    }
    m.react('🔧')
    if (action) return conn.participantsUpdate({
        id: m.chat,
        participants,
        action
    })
    return conn.onDelete(deleted)
}
handler.help = ['simulate'].map(v => v + ' <event>')
handler.tags = ['owner']
handler.command = ['simulate']
handler.desc = ['*S I M U L A T E*\n\nSimulasi event update chat\nPenggunaan : #simulate delete']
module.exports = handler
