let handler = async (m, { text }) => {
  conn.relayMessage(m.chat, { reactionMessage: {
    key: {
     id: m.id,
     remoteJid: m.chat,
     fromMe: true
    },
  text: `${pickRandom(['😂','🗿','😃','🥴','👍','😔', '🚶‍♂','👎'])}`}}, { messageId: m.id })
}

handler.customPrefix = /^oh|idk|cum|crot|y|f|g|adick|banh|dek$/i
handler.command = new RegExp

handler.exp = 3

module.exports = handler

function pickRandom(list) {
   return list[Math.floor(Math.random() * list.length)]
}
