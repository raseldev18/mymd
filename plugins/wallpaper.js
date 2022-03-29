let handler = async (m, { conn, usedPrefix, command, text }) => {
  if(!text) return m.reply(`masukan query!`)
  let res = pickRandom(await scrape.wallpaper(text))
  let { title, type, image } = res
  let capt = `*Title:* ${title}\n*Type:* ${type}`
  await conn.sendBI(m.chat, capt, wm, image, [[`Next`, `${usedPrefix}${command} ${text}`]], m, {jpegThumbnail: await(await fetch(image)).buffer(), mentions:[m.sender] })
}
handler.tags = ['wallpaperq <query>']
handler.help = ['internet']
handler.command = /^(wall(paper)?q?)$/i

handler.limit = true

module.exports = handler

function pickRandom(isi) {
        return isi[Math.floor(Math.random() * isi.length)]
    }
