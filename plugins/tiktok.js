const { Tiktok } = require('xfarr-api')
const { tiktok } = require('../lib/scrape')
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `uhm.. url nya mana?\n\ncontoh:\n${usedPrefix + command} https://vt.tiktok.com/ZGJBtcsDq/`
  if (!args[0].match(/tiktok/gi)) throw `url salah`
  const sentMsg = await m.reply(wait)
  await conn.reply(m.chat, `Downloading media from Tiktok`, 0, {
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
  var { quality, extension, size, formattedSize, } = anu.medias[0]
  var sel = `📼 *Tiktok Downloader*
  
📌 *Title:* ${title}
⏱️ *Duration:* ${duration}
✨ *Quality:* ${quality}
🗃 *Extension:* ${extension}
🎚 *Size:* ${formattedSize}
`
  //await conn.sendBI(m.chat, sel, wm, tt, 
  //[[`No WM`, `.tiktoknowm ${args[0]}`], [`Audio`, `.tiktokaudio ${args[0]}`]], 
  //sentMsg, {mentions: [m.sender], jpegThumbnail: await(await fetch(tt)).buffer()})
  let cap = `🚀 *Link:* ${await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data}`
  conn.sendBV(m.chat, cap, global.wm, medias[0].url, [[`No WM`, `.tiktoknowm ${args[0]}`], [`Audio`, `.tiktokaudio ${args[0]}`]], null, {mentions: [m.sender]})
  } catch {
    try {
    var anuu = await tiktok(args[0])
    var { nowm, wm, audio } = anuu
    conn.sendBV(m.chat, cap, global.wm, wm, [[`No WM`, `.tiktoknowm ${args[0]}`], [`Audio`, `.tiktokaudio ${args[0]}`]], 0, {mentions: [m.sender]})
  } catch {
    throw eror 
   }
 }
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)(wm)?(dl)?(down(load)?(er)?)?$/i

handler.limit = true

module.exports = handler
