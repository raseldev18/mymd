let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let readMore = String.fromCharCode(8206).repeat(4001)

let handler = async (m, { conn, isOwner, command, text }) => {
  if (conn.user.jid != conn.user.jid) return
  await m.react('⚡')                                      
  let o
  try {
    o = await exec(command.trimStart()  + ' ' + text.trimEnd())
  } catch (e) {
    o = e
  } finally {
    let { stdout, stderr } = o
    if (stdout.trim()) {
      let a = stdout.replace(/C:/gi, '').replace(/Users/gi, 'home').replace(/rdp/gi, 'usr').replace(/Desktop/gi, 'root')
      if (m.text.startsWith('$ node test')) return conn.sendButton(m.chat, readMore + a, "No eror, silahkan turu dulu 😪", null, [[`Restart`, `.restart`]], m) 
      conn.reply(m.chat, a, m)
    }
    if (stderr.trim()) {
      let b = stderr.replace(/C:/gi, '').replace(/Users/gi, 'home').replace(/rdp/gi, 'usr').replace(/Desktop/gi, 'root')
      conn.reply(m.chat, m.text.startsWith('$ node test') ? readMore + b : b, m).then(_=> {
        if (m.text.startsWith('$ node test')) conn.sendButton(m.chat, "Eror don't restart bot, kocok lagi 😎", "", null, [[`Ok`, `.say semangat:v`]], m) 
      })
    }
  }
}
handler.help = ['$']
handler.tags = ['advanced']
handler.customPrefix = /^[$]/
handler.command = new RegExp
handler.rowner = true
module.exports = handler
