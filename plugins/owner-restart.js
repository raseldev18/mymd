async function handler(m, { conn, isROwner }) {
    if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
    if (conn.user.jid == conn.user.jid) {
    conn.sendButton(m.chat, 'Mengaktifkan ulang bot...', set.wm, 0, [['Ping', '.ping']], m).then(_=> {
      process.send('reset')
    })
  } else throw '_eeeeeiiittsssss..._'
}
handler.help = ['restart']
handler.tags = ['host']
handler.command = /^(res(tart)?)$/i
handler.owner = true
module.exports =  handler
