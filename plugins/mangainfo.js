let handler = async(m, { conn, command, text }) => {
  if (!text) throw `Masukkan query!`
  m.reply(wait)
  let res = await fetch(global.API('https://api.jikan.moe', '/v3/search/manga', { q: text }))
  if (!res.ok) throw `${command} *${text}* tidak ditemukan!` //await res.text()
  let json = await res.json()
  let { title, synopsis, chapters, url, volumes, score, image_url } = json.results[0]
  let ingfonya = `✨️ *Title:* ${title}
🔥 *Chapters:* ${chapters}
🎇 *Volumes:* ${volumes}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
`.trim()
 conn.sendTBL(m.chat, ingfonya, wm, image_url, `Url Manga Info ${text} 🌐️`, `${url}`, null, null, null, null, null, null, null, null, m)
}
handler.help = ['mangainfo <query>']
handler.tags = ['anime']
handler.command = /^(manga?ing?fo|ing?fomanga?)$/i

handler.register = true 

module.exports = handler
