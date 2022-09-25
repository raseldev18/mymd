let handler = async(m, { conn, text, command, usedPrefix, isBotAdmin }) => {
  if (!text) throw `${set.sb} *Example* : ${usedPrefix + command} 628xxx|hi\n\nSimbol *|* untuk spasi atau gunakan simbol *( | , . )* untuk spasi`
  let [num, pesan] = text.split(/[,.|]/)
  let who = num.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  if (who == m.sender) throw 'Kirim menfess ke diri sendiri?\ngokil:v'
  m.react('💌')
  let sen = await conn.reply(who, `*MENFESSIN!*\n\nHalo *${conn.getName(who)}* ada pesan kecil dari seseorang yang tidak ingin disebut namanya 😇\n\nPesan : `+ pesan + `\n\n_Gesek pesan ini kekanan untuk mengirim balasan menfess_`, 0, {      
    ephemeralExpiration: 86400,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply :{
        showAdAttribution: true,
        title: 'MENFESSIN',
        body: 'Follow instagram developer bot ツ',
        thumbnail: await conn.getFile('https://telegra.ph/file/58c8b44e05443b1ea60ec.jpg').then(v => v.data),
        sourceUrl: 'https://instagram.com/rasel.ganz'
      }
    } 
  })
  if (m.isGroup && isBotAdmin) m.delete()
  if (sen) conn.reply(m.chat, `Sukses mengirim pesan rahasia ke ${m.isGroup ? conn.getName(who) : `@${parseInt(who)}`}`, m.isGroup ? null : m, { mentions: [who] })
  else throw 'Harap gunakan nomor yang valid!'
}
handler.help = ['menfess'].map(v => v + ' <number|text>')
handler.tags = ['main', 'fun']
handler.command = /^(menfess)$/i
module.exports = handler
