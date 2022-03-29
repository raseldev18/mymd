const { youtubeSearch } = require('@bochilteam/scraper')
let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!text) throw `Cari apa?\ncontoh: *${usedPrefix}${command} dj i hope you're happy*`
  
  let results = await youtubeSearch(text)
  let thumb = results.video[0].thumbnail
  let anu = thumb+'.png'
  let { video, channel } = results 
  let teks = [...video, ...channel].map(v => {
    switch (v.type) {
      case 'video': return `    
📌 *Title:* ${v.title}
⌚ *Duration:* ${v.durationH}
⏲️ *Uploaded:* ${v.publishedTime}
👁️ *Viewers:* ${v.viewH} 
🚀 *Link:* ${v.url}
`
      case 'channel': return `
📌 *Channel:* ${v.channelName}
🧑‍🤝‍🧑 *Subscriber:* ${v.subscriberH} 
🎥 *Total Video:* ${v.videoCount} video
🚀 *Link:* ${v.url}
`
    }
  }).filter(v => v).join('\n==========================')
  try {
  conn.sendMedia(m.chat, anu, m, {caption: `🔎 *YouTube Search*\n`+teks, jpegThumbnail: await(await fetch(anu)).buffer()})
  } catch {
    throw teks
  }
}
handler.help = ['ytsearch <query>']
handler.tags = ['internet']
handler.command = /^yts(earch)?$/i

module.exports = handler
