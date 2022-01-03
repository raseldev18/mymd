const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, command }) => {
  let res = await fetch('https://api.waifu.pics/nsfw/waifu')
  if (!res.ok) throw conn.reply(m.chat, eror, m) 
  let json = await res.json()
  if (!json.url) throw conn.reply(m.chat, eror, m)
  let message = await prepareWAMessageMedia({ image: await(await fetch(json.url)).buffer()}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
      templateMessage: {
            hydratedTemplate: {
                imageMessage: message.imageMessage,
                hydratedContentText: `Jangan sagne banh!`,
                hydratedFooterText: wm,
                hydratedButtons: [{
                  index: 0,
                   urlButton: {
                        displayText: `🖼 Url Image`,
                        url: `${json.url}`
                    }
                }, {
                   quickReplyButton: {
                        displayText: `Get Again`,
                        id: `${usedPrefix}${command}`
                    },
                    selectedIndex: 1
                }]
            }
        }
    }), { userJid: m.participant || m.key.remoteJid, quoted: m });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
  //conn.sendFile(m.chat, json.url, '', 'sange kok ama kucing', m, 0, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['nsfwwaifu']
handler.tags = ['nsfw']
handler.command = /^(nsfwwaifu|waifunsfw)$/i

handler.limit = true

module.exports = handler
