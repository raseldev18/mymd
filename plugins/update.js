let { execSync } = require('child_process')
let handler = async (m, { conn, text, isROwner }) => {
  if (conn.user.jid == conn.user.jid) {
    let stdout = execSync('git remote set-url origin ' + set.repo + '.git && git pull' + (isROwner && text ? ' ' + text : ''))
    if (isROwner) require('fs').readdirSync('plugins').map(v => global.reload('', v))
    conn.sendButton(m.chat, stdout.toString(), wm, 0, [['Node Test', '$ node test']], m)
  }
}
handler.help = ['update']
handler.tags = ['host']
handler.command = /^(update|uo?p?|uodate)$/i //sedia payung sebelum hujan meteor 
handler.rowner = true

module.exports = handler
