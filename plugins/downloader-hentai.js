/* const { NHentai } = require('@shineiichijo/nhentai-ts')

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `${set.sb} *Example* : ${usedPrefix + command} 401998`
  const nhentai = new NHentai()
  const { images, title } = await nhentai.getDoujin(args[0]).catch(() => { throw "Invalid doujin ID" })
  await conn.sendFile(m.chat, await images.PDF(), title + ".pdf", title, m, null, {
    mimetype: "application/pdf",
    asDocument: true,
  })
}
handler.help = ['nhentai'].map(v => v + ' <id>')
handler.tags = ['downloader']
handler.command = /^(nhentai)$/i
module.exports = handler */
