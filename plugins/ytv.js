let fetch = require('node-fetch')
let axios = require('axios')
const { servers, ytv } = require('../lib/y2mate')
const { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, text, args, command, isPrems, isOwner }) => {
  if (!text) throw `uhm urlnya mana?`
  let ras = `url salah, perintah ini untuk mengunduh watch/shorts`
  if (!args[0].match(/(https|http):\/\/(www.youtube.com|www.youtube|www.youtu.be|youtube.com|youtu.be.com|youtu.be)\/(watch|shorts)|(https|http):\/\/(www.youtube.com|www.youtube|www.youtu.be|youtube.com|youtu.be.com|youtu.be)/gi)) throw ras
  let limit
  if((isOwner || isPrems)) limit = 300
  else limit = 100
  if (!args || !args[0]) throw 'Uhm... urlnya mana?'
  const sentMsg = await m.reply(wait)
  try {
  let vid = await youtubedl(args[0])
  let { thumbnail, video, title } = vid
  let det = vid.video['360p']
  let { quality, fileSizeH, fileSize } = det
  let url = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  let urlshort = await(await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)).data
  let capt = `📽 *YouTube MP4*

📌 *Title:* ${title}
🎚 *Size:* ${fileSizeH}
✨ *Quality:* ${quality}
${isLimit ? `❌ *Ukuran file di atas ${limit} MB, download sendiri*\n` : ''}🚀 *Link:* ${urlshort}` 
  await conn.sendMedia(m.chat, thumbnail, sentMsg, {jpegThumbnail: await(await fetch(thumbnail)).buffer(), caption: capt})
  if (!isLimit) await conn.sendMedia(m.chat, url, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: `${args[0]}`,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: bodlink, //`${fileSizeH}`,
    thumbnail: await(await fetch(thumbnail)).buffer(),
   }} 
  }) 
  } catch {
  try {
  let vid = await youtubedlv2(args[0])
  let { thumbnail, video, title } = vid
  let det = vid.video['360p']
  let { quality, fileSizeH, fileSize } = det
  let url = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await conn.sendMedia(m.chat, url, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: `${args[0]}`,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: bodlink, //`${fileSizeH}`,
    thumbnail: await(await fetch(thumbnail)).buffer(),
   }}
  }) 
  } catch {
  try {
  let vid = await youtubedlv3(args[0])
  let { thumbnail, video, title } = vid
  let det = vid.video['360p']
  let { quality, fileSizeH, fileSize } = det
  let url = await det.download()
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < fileSize
  if (!isLimit) await conn.sendMedia(m.chat, url, 0, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: `${args[0]}`,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: bodlink, //`${fileSizeH}`,
    thumbnail: await(await fetch(thumbnail)).buffer(),
   }}
  }) 
  } catch {
  try {
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb: thumbnail, title, filesize, filesizeF } = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? limit : limit) * 1024 < filesize
  if(!isLimit) await conn.sendMedia(m.chat, dl_link, null, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: `${args[0]}`,
    mediaType: 2,
    description: deslink, 
    title: titlink,
    body: bodlink, //`${fileSizeH}`,
    thumbnail: await(await fetch(thumbnail)).buffer(),
   }}
  })
  } catch {
    throw eror 
        }
      }
    }
  }
}
handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = /^yt(v?(ideo)?|mpp?4|v?short)(d(oc(ument)?)?)?$/i

handler.limit = true 

module.exports = handler
