const { sticker, sticker1, sticker2, sticker3, sticker4, sticker5, sticker6 } = require('../lib/sticker.js')
const { webp2png } = require('../lib/webp2mp4.js')
const uploadImage = require('../lib/uploadImage.js')
const scrape = require('../lib/scrape.js')
const bocil = require('@bochilteam/scraper')
const fetch = require('node-fetch')
const Carbon = require('unofficial-carbon-now')

let handler = m => m
handler.before = async function(m, { conn, isOwner }) {
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys) return
    let setting = global.db.data.settings[conn.user.jid]
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    let qq = m.quoted
    let q = qq.hydratedFourRowTemplate ? qq.hydratedFourRowTemplate.hydratedContentText : qq.text      
    //======================================================================================================================//
    // report ans
    if (/(REPORT|REQUEST|INVITING|ERROR|MESSAGE)!/i.test(q)) {
        if (!m.text) return      
        m.react('↖️')
        conn.fakeReply(m.quoted.mentionedJid[0], `*MESSAGE!*\n\nDari : ${!isOwner ? '@' + parseInt(m.sender) : conn.getName(m.sender)}\n\nPesan : ${m.text}\n\n_Gesek pesan ini kekanan untuk membalas_`, m.quoted.mentionedJid[0], `${m.quoted.text.split`Pesan :`[1]}`, null, { mentions: [m.sender], ephemeralExpiration: 86400 })                              
    }
    // quotes
    if (q.endsWith('*quotes*_')) {
        if (!m.text) return   
        m.react(['🍃', '🍂', '🍁', '🌿'].getRandom())
        let res = await scrape.quotes(m.text)
        if (!res.status) return m.reply(`Quotes *${m.text}* tidak ditemukan!`)
        let rand = res.data.getRandom()
        let caption = `*${set.sa} Q U O T E S*\n\n${rand.quote}`
        conn.sendButton(m.chat, caption, set.wm, set.fla + "quotes", [`Quotes ${m.text}`, `.quotes ${m.text}`], m, { asLocation: true })       
    }
    // carbon
    if (q.endsWith('*carbon*_')) {
        if (!m.text) return
        m.react('⏱️')
        let buat = new Carbon.createCarbon().setCode(m.text)
        let hasil = await Carbon.generateCarbon(buat)
        conn.sendFile(m.chat, hasil, 'carbon.png', '', m)
    }
    // apk search
    if (q.endsWith('*aplikasi*_')) {
       if (!m.text) return
       m.react('⏱️')
       let res = await (await fetch(API('neoxr',  '/api/apk', { q: m.text }, 'apikey'))).json() 
       if (!res.status && res.msg) return m.reply(res.msg) // (`APK *${m.text}* tidak ditemukan!`)
       let row = []
       for (const i of res.data) {           
           row.push({
           title: `${i.name}`,
           description: `[ Size: ${i.size} || Vesion: ${i.version} ]`,
           rowId: '.apkd ' + i.url
       })
       }
       conn.sendListM(m.chat, `${set.sa} A P K  S E A R C H\n`, `Silahkan download apk dibawah!`, set.wm, row, m)                
    }
    // sticker
    if (q.endsWith('*sticker*_') || q.endsWith('meme*_')) {
       if (chat.stiker) return
       let mime = (m.msg || m).mimetype
       if (!/webp|video|image/.test(mime)) return 
       m.react('⏱️')
       let media = await m.download() 
       if (m.text) {
          let [atas, bawah] = m.text.split(/[,.|]/)
          let image
          if (/webp/.test(mime)) {
             let anu = await webp2png(media)
             image = await (await fetch(anu)).buffer()
          } else {
             image = media
             let url = await uploadImage(image)
             media = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
          }
       }
       conn.sendSticker(m.chat, media, m, { packname: set.pack, author: set.auth, asSticker: /webp/g.test(mime) })
    }
    // sticker attp
    if (q.endsWith("*attp*_")) {
       if (!m.text) return
       m.react('⏱️')
       let res = await (await fetch(API('xteam', '/attp', { file: '', text: m.text }))).buffer()
       let attp = await sticker5(false, res, set.pack, set.auth)
       conn.sendFile(m.chat, attp, 'attp.webp', '', m, false, { mentions: [m.sender], asSticker: true })
    }
    // sticker ttp
    if (q.endsWith("*ttp*_")) {
       if (!m.text) return
       m.react('⏱️')
       let res = await (await fetch(API('xteam', '/ttp', { file: '', text: m.text }))).buffer()
       let ttp = await sticker5(false, res, set.pack, set.auth)
       conn.sendFile(m.chat, ttp, 'ttp.webp', '', m, false, { mentions: [m.sender], asSticker: true })
    }
    // no back ground
    if (q.endsWith('*nobg*_')) {
       let mime = (m.msg || m).mimetype
       if (/video/.test(mime)) return 
       let q = m
       let media
       try {
         let mime = (q.msg || q).mimetype || ''
         if (/webp/.test(mime)) {
            if (q.seconds) throw `Maaf media stiker gif tidak support`
            let webp = await q.download()
            media = await webp2png(webp)
         } else media = await q.download()
       } catch {
         if (isUrl(m.text.split(' ')[0])) media = m.text.split(' ')[0]
         else return 
       }
       m.react('⏱️')
       let res = API('violet', '/api/media/removebg', { img: media }, 'apikey')
       conn.sendFile(m.chat, res, 'removebg.jpg', set.wm, m)
    }
    // menfess
    if (q.endsWith('menfess_')) {
        if (!m.text) return m.reply('Harap gunakan teks untuk membalas pesan rahasia!')
        m.react('💌')
        let med = ["https://telegra.ph/file/620bcc109157b23a656f3.jpg", "https://telegra.ph/file/3eb3c21b4d19626332284.jpg"].getRandom()
        let { data } = await conn.getFile(med)
        conn.reply(m.quoted.mentionedJid[0], `*MENFESSIN!*\n\nBalasan pesan menfess\n\nPesan : ${m.text}\n\n_Gesek pesan ini kekanan untuk mengirim balasan menfess_`, 0, {
          ephemeralExpiration: 86400,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
               showAdAttribution: true,
               title: 'MENFESSIN',
               body: 'Follow instagram developer bot ツ',
               thumbnail: data,
               sourceUrl: 'https://instagram.com/rasel.ganz'
            }
          } 
       })
    }
    //=====================================================================================================================//
}
handler.exp = 0
module.exports = handler

function isUrl(text) {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
