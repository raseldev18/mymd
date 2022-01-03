const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
const { fbdl } = require('../lib/fbdl')
let handler = async (m, { conn, args, usedPrefix, command }) => {

  try {
  if (!args[0]) return m.reply('urlnya mana')
  if (!args[0].includes("facebook")) return m.reply('url is wrong')
  const v = await fbdl(args[0])
  conn.reply(m.chat, wait, m)
  //conn.sendFile(m.chat, v.hasil.link_high, 'fb.mp4', `
  let selll = `*Berhasil Mendapatkan Video*\n\n⬇️Post by ${v.hasil.author}\n📖desk: ${v.hasil.title}` //, m, 0, {mimetype: 'video/gif'})
  let message = await prepareWAMessageMedia({ video: await(await fetch(v.hasil.link_high)).buffer()}, { upload: conn.waUploadToServer })
     const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
      templateMessage: {
            hydratedTemplate: {
                videoMessage: message.videoMessage,
                hydratedContentText: selll,
                hydratedFooterText: wm,
                hydratedButtons: [{
                  index: 0,
                   urlButton: {
                        displayText: `🌐️ Url Video Facebook`,
                        url: `${v.hasil.link_high}`
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
  } catch (e) {
  console.log('error Banh')
  }
  }
handler.help = ['fb'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^f((b|acebook)(dl|download)?(er)?)$/i

handler.limit = true 

module.exports = handler
