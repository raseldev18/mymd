const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
const fetch = require('node-fetch')

let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) throw 'Nyari apa?'
  let res = await fetch(global.API('https://wall.alphacoders.com/api2.0', '/get.php', {
    auth: '3e7756c85df54b78f934a284c11abe4e',
    method: 'search',
    term: text
  }))
  if (!res.ok) throw eror
  let json = await res.json()
  let img = json.wallpapers[Math.floor(Math.random() * json.wallpapers.length)]
  let selll = `*────「 Wallpaper 」────*\n\n➤ *search :* ${text}\n➢ *type :* image/jpg`
  //await conn.sendFile(m.chat, img.url_image, 'wallpaper', '', m, 0, { thumbnail: Buffer.alloc(0) })
  let message = await prepareWAMessageMedia({ image: await(await fetch(img.url_image)).buffer()}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
      templateMessage: {
            hydratedTemplate: {
                imageMessage: message.imageMessage,
                hydratedContentText: selll,
                hydratedFooterText: wm,
                hydratedButtons: [{
                  index: 0,
                   urlButton: {
                        displayText: `📸 Url Wallpaper`,
                        url: `${img.url_image}`
                    }
                }, {
                   quickReplyButton: {
                        displayText: `Wallpaper ${text}`,
                        id: `${usedPrefix}${command} ${text}`
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
}
handler.help = ['wallpaperq <query>']
handler.tags = ['internet']
handler.command = /^wall(paper)?q?$/i
handler.limit = true
handler.register = true
module.exports = handler
