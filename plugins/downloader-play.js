let { youtubeSearch, youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')

let handler = async (m, { conn, isOwner, isPrems, command, text, args, usedPrefix }) => {
  if(!text) throw `*Contoh:* ${usedPrefix + command} judul atau url`
  m.react('⏱️')
  let res = await youtubeSearch(text)
  let vid = res.video
  let vide 
  if (/playrand(om)?$/i.test(command)) vide = pickRandom(vid)
  else vide = vid[0]
  if(!vide) return conn.sendButton(m.chat, 'Video/Audio Tidak ditemukan', wm, null, [[await conn.trans('Coba Lagi'), `.play ${text} lainnya`]], m) 
  let { authorName, authorAvatar, title, description, url, thumbnail, videoId, durationH, viewH, publishedTime } = vide
  let caption = `${set.sa} *Y T   P L A Y*\n
${set.sb} *Title* : ${title ? title : 'Not found'}
${set.sb} *Duration* : ${durationH ? durationH : 'Not found'}
${set.sb} *Viewers* : ${viewH ? viewH : 'Not found'}
${set.sb} *Uploaded* : ${publishedTime ? publishedTime : 'Not found'}
${set.sb} *Channel* : ${authorName ? authorName : 'Not found'}
${set.sb} *Source* : ${url ? url : 'Not found'}
${set.sb} *Description* : ${description ? description : 'Not found'}
`
  let td = pickRandom([
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf',
    'text/rtf'
  ])
  conn.sendButton(m.chat, caption, 'Select Audio/Video or Random Play', thumbnail, [['Audio', `${usedPrefix}yta ${url}`], ['Video', `${usedPrefix}ytv ${url}`], ['Play Random', `${usedPrefix}playrand ${text}`]], m, { 
     document: { url: thumbnail }, 
     fileName: 'Happy watching' + ` ${conn.chats[m.sender].name} 🤩`, mimetype: td, fileLength: 9999999999999, pageCount: 2022,
     mentions: [m.sender],
     contextInfo: {
        externalAdReply :{
           mediaUrl: url,
           mediaType: 2,
           title: conn.user.name, 
           body: set.wm,
           thumbnail: await conn.getBuffer(thumbnail),
        }
     } 
  })
}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^play(rand(om)?)?$/i
handler.desc = ['Mencari video dari Youtube, gunakan perintah *#play judul atau url* hilangkan tanda < >']
module.exports = handler

function pickRandom (list) {
    return list[Math.floor(list.length * Math.random())]
}

// by bit.ly/AcellComel
