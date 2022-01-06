const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Masukkan query!`
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/manga', { q: text }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let { title, synopsis, chapters, url, volumes, score, image_url } = json.results[0]
let mangaingfo = `✨️ *Title:* ${title}
🔥 *Chapters:* ${chapters}
🎇 *Volumes:* ${volumes}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
`
  let message = await prepareWAMessageMedia({ image: await(await fetch(image_url)).buffer()}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
      templateMessage: {
            hydratedTemplate: {
                imageMessage: message.imageMessage,
                hydratedContentText: mangaingfo,
                hydratedFooterText: wm,
                hydratedButtons: [{
                  index: 0,
                   urlButton: {
                        displayText: `🌐️ Url`,
                        url: `${url}`
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
 // conn.sendFile(m.chat, image_url, '', animeingfo, m)
}
handler.help = ['mangainfo <query>', 'manga <query>']
handler.tags = ['anime']
handler.command = /^(manga(ing?fo)?)$/i
handler.register = true 
module.exports = handler
