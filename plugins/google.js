let fetch = require('node-fetch')
let googleIt = require('google-it')
let handler = async (m, { conn, command, usedPrefix, args }) => {
  let full = /f$/i.test(command)
  let text = args.join` `
  if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} Bahasa pemrograman`
  let url = 'https://google.com/search?q=' + encodeURIComponent(text)
  let search = await googleIt({ query: text })
  let msg = search.map(({ title, link, snippet }) => {
    return `*${title}*\n_${link}_\n_${snippet}_`
  }).join`\n\n=========================\n\n`
  try {
    await conn.sendMedia(m.chat, 'https://telegra.ph/file/92a008f4c1a2bfb1671e5.mp4', m, {caption: '*Google Search*\n\n*Source:* ' + url + '\n\n' + msg, gifPlayback: true, jpegThumbnail: await(await fetch('https://telegra.ph/file/62da3c5e3f4319d949705.jpg')).buffer()})
   } catch {
    throw msg
  }
}
handler.help = ['google'].map(v => v + ' <query>')
handler.tags = ['internet']
handler.command = /^g(ooglef?)?$/i

module.exports = handler

