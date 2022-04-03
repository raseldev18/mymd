const { youtubeSearch } = require('@bochilteam/scraper')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  let lang = db.data.users[m.sender].language
    if(!text) throw `Contoh: ${usedPrefix}${command} i see your monster`
    m.reply2(wait)
    let anu = await youtubeSearch(text)
    let vid = anu.video
    let vide 
    if (/playrand(om)?$/i.test(command)) vide = conn.rand(vid)
    else vide = vid[0]
    if(!vide) return conn.sendB(m.chat, await conn.trans('Video/Audio Tidak ditemukan'), wm, null, [[await conn.trans('Coba Lagi'), `.play ${text} lainnya`]], m) 
    let { authorName, authorAvatar, title, description, url, thumbnail, videoId, durationH, viewH, publishedTime } = vide
    let capt = `🎬 *YouTube Play*
  
📌 *Title:* ${title}
📮 *ID:* ${videoId}
⌚ *Duration:* ${durationH}
👁️ *Viewers:* ${viewH}
⏲️ *Uploaded:* ${publishedTime}
👑 *Author Name:* ${authorName}
🚀 *Source:* ${url}
📝 *Description:* ${description}`
    await conn.sendBD(m.chat, capt, wm, img, [['🎧 Audio 🎧', `${usedPrefix}yta ${url}`], ['📽 Video 📽', `${usedPrefix}ytv ${url}`], [`🔎 Play ${await conn.trans(lang, 'Acak').catch(async _ => await conn.trans2(lang, 'Acak'))} 🔍`, `${usedPrefix}playrand ${text}`]], m, {
     fileName: await conn.trans('Selamat menonton')+` ${m.name} 🤩`, mimetype: global.td, fileLength: global.fsdx, pageCount: global.pcdx,
     contextInfo: {
     jpegThumbnail: await(await fetch(thumbd)).buffer(),
     mentionedJid: [m.sender],
     externalAdReply :{
     mediaUrl: `${url}`,
     mediaType: 2,
     description: deslink, 
     title: titlink+'ツ', 
     body: bodlink,
     thumbnail: await(await fetch(thumbnail)).buffer()
     }} 
    })
}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^play(rand(om)?)?$/i

module.exports = handler

