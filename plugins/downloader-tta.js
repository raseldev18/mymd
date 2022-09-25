const { tiktokdl, savefrom } = require('@bochilteam/scraper')
const { tiktok } = require('../lib/scrape.js')
const { toAudio, toPTT } = require('../lib/converter.js')

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `${set.sb} *Example* : ${usedPrefix + command} url`
  if (!args[0].match(/((www|vt|vm).tiktok.com)/gi)) throw `Url salah, perintah ini untuk mengunduh Media Tiktok`
  m.react('⏱️')
  let doc = db.data.chats[m.chat].asDocument
  try {
    let res = await savefrom(args[0])
    let { id, url, meta, thumb, video_quality, sd, hd, hosting } = res[0] //ntalah savefrom sih
    let v = url[0].url
    let a = await conn.getBuffer(v)
    let au = await toAudio(a, 'mp4')
    await conn.sendFile(m.chat, au.data, meta.title + '.mp3', '', m, /vn/.test(args[1]), { asDocument: doc, mentions: [m.sender] })
  } catch {
  try {
    let res = await tiktokdl(args[0])
    let { author: { nickname }, video, description } = res
    let v = video.no_watermark
    let a = await conn.getBuffer(v)
    let au = await toAudio(a, 'mp4')
    await conn.sendFile(m.chat, au.data, description + '.mp3', '', m, /vn/.test(args[1]), { asDocument: doc, mentions: [m.sender] })
  } catch {
  try {
    let { nowm, wm, audio } = await tiktok(args[0])
    let a = await conn.getBuffer(nowm)
    let au = await toAudio(a, 'mp4')
    await conn.sendFile(m.chat, au.data, 'tiktok.mp3', '', m, /vn/.test(args[1]), { asDocument: doc, mentions: [m.sender] })
  } catch (e) {
    throw e
    }
   }
  }
}
handler.help = ['tiktokmpm3'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(t(ik)?t(ok)?(d(own)?l(oader)?)?(mp3|sound|musi(c|k)|a(udio)?))$/i
handler.limit = true
handler.desc = ['Mendownload media audio dari Tiktok, gunakan perintah *#tiktokmp3 url* hilangkan tanda < >']
module.exports = handler

// by bit.ly/AcellComel

