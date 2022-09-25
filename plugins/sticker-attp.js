let { sticker5 } = require('../lib/sticker.js')
let fetch = require('node-fetch')

let handler = async(m, { text, conn, usedPrefix, command }) => {
  let err = `${set.sb} *Example* : ${usedPrefix + command} teks\n\n_Gesek pesan ini kekanan untuk membuat sticker *attp*_`
  if (!text && !m.quoted) throw err
  if (m.quoted?.buttons) throw err
  m.react('⏱️')
  let teks = m.quoted ? m.quoted.text : text
  try {
    let res = await (await fetch(API('xteam', '/attp', { file: '', text: teks }))).buffer()
    let attp = await sticker5(false, res, set.pack, set.auth)
    conn.sendFile(m.chat, attp, 'attp.webp', '', m, false, { mentions: [m.sender], asSticker: true })
  } catch (e) {
    throw e
  }
}
handler.help = ['attp'].map(v => v + ' <text>')
handler.tags = ['sticker']
handler.command = ['attp']
module.exports = handler 
