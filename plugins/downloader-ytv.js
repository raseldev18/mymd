let { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let { servers, ytv } = require('../lib/y2mate.js')
let axios = require('axios')

let handler = async (m, { conn, args, usedPrefix, command, isPrems, isOwner, expiration }) => {
   if (!args[0]) throw `${set.sb} *Example* : ${usedPrefix + command} url`
   let ras = `Url salah, perintah ini untuk mengunduh video youtube (watch/shorts)`
   if (!args[0].match(/(https|http):\/\/(www.youtube.com|www.youtube|www.youtu.be|youtube.com|youtu.be.com|youtu.be)\/(watch|shorts)?/gi)) throw ras
   m.react('⏱️')
   let limit = isPrems ? 300 : 100 
   let doc = db.data.chats[m.chat].asDocument
   let qua
   if (/vid(eo)|yt(v?(ideo)?|mpp?4|v?short)(d(oc(ument)?)?)?1080p?$/i.test(command) || args[1] == '1080') {
     if (!isPrems) { 
        set.dfail('premium', m, conn) 
        throw false 
     }
     qua = '1080p'
   } else if (/vid(eo)|yt(v?(ideo)?|mpp?4|v?short)(d(oc(ument)?)?)?720p?$/i.test(command) || args[1] == '720') {
     if (!isPrems) { 
        set.dfail('premium', m, conn) 
        throw false 
     }
     qua = '720p'
   } else if (/vid(eo)|yt(v?(ideo)?|mpp?4|v?short)(d(oc(ument)?)?)?480p?$/i.test(command) || args[1] == '480') {
     qua = '480p'
   } else qua = '360p'
   let isLimit
   try {
     let res = await youtubedl(args[0])
     isLimit = limit * 1024 < res.video[qua].fileSize
   } catch {
     console.log('yt1 eror mencoba yt2')
     try {
       let res = await youtubedlv2(args[0])
       isLimit = limit * 1024 < res.video[qua].fileSize
     } catch {
       console.log('yt2 eror mencoba yt3')
       try {
         let res = await youtubedlv3(args[0])
         isLimit = limit * 1024 < res.video[qua].fileSize
       } catch {
         console.log('yt3 eror mencoba yt4')
         let server = (args[1] || servers[0]).toLowerCase()
         let anu = await ytv(args[0], servers.includes(server) ? server : servers[0])
         isLimit = limit * 1024 < anu.filesize
       }
     }
   }
   let res = await youtubedl(args[0])
   let media 
   try { 
     media = await res.video[qua].download()
   } catch {
     console.log('yt1 eror mencoba yt2')
     try {       
        let res2 = await youtubedlv2(args[0])
        media = await res2.video[qua].download()
     } catch {
       console.log('yt2 eror mencoba yt3')
       try {
          let res3 = await youtubedlv2(args[0])
          media = await res3.video[qua].download()
       } catch {
         console.log('yt3 eror mencoba yt4')
         let server = (args[1] || servers[0]).toLowerCase()
         let anu = await ytv(args[0], servers.includes(server) ? server : servers[0])
         media = anu.dl_link
       }
     }
   }
   let anu
   if (isLimit) anu = `_File size above average ${limit} MB download it yourself_\n${await(await axios.get(`https://tinyurl.com/api-create.php?url=${media}`)).data}`                 
   else anu = `_Wait for the video to be sent it may take a few minutes!_`
   let capt = `${set.sa}  *Y T   M P 4*
   
${set.sb} *Title* : ${res.title ? res.title : 'Not found'}
${set.sb} *Size* : ${res.video[qua]?.fileSizeH ? res.video[qua]?.fileSizeH : 'Not found'}
${set.sb} *Quality* : ${res.video[qua]?.quality ? res.video[qua]?.quality : 'Not found'}

${anu}
  `
   let sentMsg = await conn.reply(m.chat, capt, m, {
     ephemeralExpiration: expiration,
     contextInfo: {
       externalAdReply :{
         mediaType: 1,
         title: set.wm, 
         thumbnail: await conn.getBuffer(res.thumbnail),
         renderLargerThumbnail: true,
       }
     }
   })
   if (!isLimit) conn.sendFile(m.chat, media, res.title + '.mp4', res.title, sentMsg, null, { asDocument: doc, mentions: [m.sender] })
}
handler.help = ['ytmp4'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /(vid(eo)?|y(ou)?t(ube)?(short|v(ideo)?|mpp?4)?((480|720|1080)p?)?)$/i
handler.limit = true 
handler.desc = ['Mendownload media video dari Youtube, gunakan perintah *#ytmp4 url* hilangkan tanda < >, untuk pilihan resolusi atau kualitas video gunakan perintah *#ytmp4 url resolusi* contoh *#ytmp4 url 480* pilihan resolusi (480, 720, 1080)']
module.exports = handler
