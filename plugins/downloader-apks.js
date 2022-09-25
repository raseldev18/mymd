let fetch = require('node-fetch')

let handler = async(m, { conn, usedPrefix, command, text }) => {
  if (!text) throw `${set.sb} *Example* : ${usedPrefix + command} whatsapp\n\n_Gesek pesan ini kekanan untuk mencari *aplikasi*_`             
  m.react('⏱️')
  let res = await (await fetch(API('neoxr',  '/api/apk', { q: text }, 'apikey'))).json() 
  if (!res.status) throw `APK *${text}* tidak ditemukan!`
  let row = []
  for (const i of res.data) {
    row.push({
      title: `${i.name}`,
      description: `[ Size: ${i.size} || Vesion: ${i.version} ]`,
      rowId: usedPrefix + 'apkd ' + i.url
    })
  }
  conn.sendListM(m.chat, `${set.sa} A P K  S E A R C H\n`, `Silahkan pilih apk dibawah!`, set.wm, row, m)                
}
handler.help = ['apk'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(apk)$/i
handler.limit = true
module.exports = handler
