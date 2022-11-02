let fs = require('fs')
let handler = m => m


handler.all = async function (m) {
    if (m.chat.endsWith('broadcast')) return  //@g.us
    let { isBanned } = db.data.chats[m.chat]
    let { banned } = db.data.users[m.sender]
    let { group } = db.data.settings[this.user.jid]

    if (/^(hmmm|hmm)$/i.test(m.text)) {
        conn.sendMessage(m.chat, {
            react: {text: `😈`, key: m.key,}})
       }
    if (/^(love u|i love you|lub u|i love u)$/i.test(m.text)) {
        conn.sendMessage(m.chat, {
            react: {text: `❤️`, key: m.key,}})
       }
    if (/^(fuck|fuck u|fuck you|cum)$/i.test(m.text)) {
        conn.sendMessage(m.chat, {
            react: {text: `🖕`, key: m.key,}})
       }
    if (/^(sad|sed|sedd|sed aki|sedd aki)$/i.test(m.text)) {
        conn.sendMessage(m.chat, {
            react: {text: `😢`, key: m.key,}})
       }
    if (/^(myre|myr|mire)$/i.test(m.text)) {
        conn.sendMessage(m.chat, {
            react: {text: `🥴`, key: m.key,}})
       }
     if (/^(Entha myre)$/i.test(m.text)) {
        conn.sendMessage(m.chat, {
            react: {text: `🤷‍♂️`, key: m.key,}})
       }
       if (/^(haha)$/i.test(m.text)) {
        conn.sendMessage(m.chat, {
            react: {text: `😂`, key: m.key,}})
       }
  
  
}

handler.exp = 3
module.exports = handler
