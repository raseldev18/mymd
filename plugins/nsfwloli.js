const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
let fetch = require('node-fetch')
   let handler  = async (m, { conn, usedPrefix, command }) => {
      let res = await fetch(global.API('lolhum', '/api/random/nsfw/loli', 'APIKEY'))
    if (!res.ok) throw conn.reply(m.chat, eror, m)
    let lolinya = await res.buffer()
    if (!lolinya) throw conn.reply(m.chat, eror, m)
   //let lolinya = `https://api.lolhuman.xyz/api/random/nsfw/loli?apikey=` + apikeylolhuman
   //conn.sendButtonImg(m.chat, json, 'Jangan coli ya', wm, '➡️ NEXT', `${usedPrefix + command}`, m, false)
   let message = await prepareWAMessageMedia({ image: await(await fetch(lolinya)).buffer()}, { upload: conn.waUploadToServer })
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
                        url: `https://api.lolhuman.xyz/api/random/nsfw/loli?apikey=apikeylubanh:v`
                    }
                }, {
                   quickReplyButton: {
                        displayText: `🔞 Get Again`,
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
}
handler.help = ['nsfwloli']
handler.tags = ['nsfw']
handler.command = /^(nsfwloli|lolinsfw)$/i

handler.limit = true
handler.register = true

module.exports = handler
