const { Tiktok } = require('xfarr-api')
const { tiktok } = require('../lib/scrape')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `uhm.. url nya mana?\n\ncontoh:\n${usedPrefix + command} https://vt.tiktok.com/ZGJBtcsDq/`
  if (!args[0].match(/tiktok/gi)) throw `url salah`
  await m.reply(wait)
  const sentMsg = await conn.reply(m.chat, `Downloading media from Tiktok`, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: linkig,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: wm, //`${fileSizeH}`,
    thumbnail: await(await fetch(img)).buffer(),
    sourceUrl: linkgc
     }}
  })
  const tt = `https://telegra.ph/file/71642ff8811e2a2cdc79d.jpg`
  try {
  var anu = await Tiktok(args[0])
  var { url, title, thumbnail, duration, source, medias } = anu
  var { quality, extension, size, formattedSize, } = anu.medias[1]
  let cap = `🚀 *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${medias[1].url}`)).data}`
  await conn.sendMedia(m.chat, medias[1].url, null, {caption: cap, mentions: [m.sender]})
  } catch {
    try {
    var anuu = await tiktok(args[0])
    var { nowm, wm, audio } = anuu
    let cap = `🚀 *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)).data}`
    conn.sendMedia(m.chat, nowm, 0, {caption: cap, mentions: [m.sender]})
  } catch {
    throw eror 
   }
 }
}
handler.help = ['tiktoknowm'].map(v => v + ' <url>')
handler.tags = ['downloader', 'premium']
handler.command = /^(tt|tiktok)nowm(dl)?(download(er)?)?$/i

handler.premium = true

module.exports = handler

