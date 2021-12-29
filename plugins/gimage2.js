let { promisify } = require('util')
let _gis = require('g-i-s')
let gis = promisify(_gis)
let fetch = require('node-fetch')
let handler  = async (m, { conn, args, text }) => {
  if (!text) return m.reply('Cari apa?')
  let results = await gis(text) || []
  let { url, width, height } = pickRandom(results) || {}
  if (!url) return m.reply('404 Not Found')
let cokk = `
*── 「 GOOGLE IMAGE 」 ──*

${text}
➸ *width*: ${width}
➸ *height*: ${height}
`
//====//
const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
     templateMessage: {
         hydratedTemplate: {
           hydratedContentText: cokk.trim(),
           imageMessage: { image: await (await fetch(url))},
           hydratedFooterText: wm,
           hydratedButtons: [{
             urlButton: {
               displayText: 'Link Images',
               url: `${url}`
             }
           },
           {
             quickReplyButton: {
               displayText: 'lagi',
               id: `#image ${text}`
             }
           }]
         }
       }
     }), { userJid: m.sender, quoted: m });
    //conn.reply(m.chat, text.trim(), m)
    return await conn.relayMessage(
         m.chat,
         template.message,
         { messageId: template.key.id }
     )
  }
  //=====//
}
handler.help = ['image2 <query>']
handler.tags = ['internet']
handler.command = /^((gimage|ima?ge?)2)$/i

module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
