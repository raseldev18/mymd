const { youtubeSearch } = require('@bochilteam/scraper')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  let lang = db.data.users[m.sender].language
    let con = `Contoh: ${usedPrefix}${command} i see your monster`
    let teks = await conn.trans(lang, con).catch(async _ => await conn.trans2(lang, con))
    if(!text) return m.reply(teks)
    let w = await conn.trans(lang, wait).catch(async _ => await conn.trans2(lang, wait))
    m.reply(w)
    let titlex = await conn.trans(lang, titlink).catch(async _ => await conn.trans2(lang, titlink))
    let ucap = await conn.trans(lang, 'Selamat menonton').catch(async _ => await conn.trans2(lang, 'Selamat menonton'))
    let anu = await youtubeSearch(text)
    let vid = anu.video
    let vide 
    if (/playrand(om)?$/i.test(command)) vide = conn.rand(vid)
    else vide = vid[0]
    let novid = await conn.trans(lang, 'Video/Audio Tidak ditemukan').catch(async _ => await conn.trans2(lang, 'Video/Audio Tidak ditemukan'))
    if(!vide) return conn.sendB(m.chat, novid, wm, null, [[await conn.trans(lang, 'Coba Lagi').catch(async _ => await conn.trans2(lang, 'Coba Lagi')), `.play ${text} lainnya`]], m) 
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
     fileName: ucap+` ${m.name} 🤩`, mimetype: global.td, fileLength: global.fsdx, pageCount: global.pcdx,
     contextInfo: {
     jpegThumbnail: await(await fetch(thumbd)).buffer(),
     mentionedJid: [m.sender],
     externalAdReply :{
     mediaUrl: `${url}`,
     mediaType: 2,
     description: deslink, 
     title: titlex+'ツ', 
     body: bodlink,
     thumbnail: await(await fetch(thumbnail)).buffer()
     }} 
    })
}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^play(rand(om)?)?$/i

module.exports = handler

