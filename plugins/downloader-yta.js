let { youtubedl, youtubedlv2, youtubedlv3 } = require('@bochilteam/scraper')
let { servers, yta } = require('../lib/y2mate.js')
let axios = require('axios')

let handler = async (m, { conn, args, usedPrefix, command, isPrems, expiration }) => {
   if (!args[0]) throw `${set.sb} *Example* : ${usedPrefix + command} url`
   let ras = `Url salah, perintah ini untuk mengunduh audio youtube (watch/shorts)`
   if (!args[0].match(/(https|http):\/\/(www.youtube.com|www.youtube|www.youtu.be|youtube.com|youtu.be.com|youtu.be)\/(watch|shorts)?/gi)) throw ras
   m.react('⏱️')
   let limit = isPrems ? 300 : 100 
   let doc = db.data.chats[m.chat].asDocument
   let qua = '128kbps'
   let isLimit
   try {
     let res = await youtubedl(args[0])
     isLimit = limit * 1024 < res.audio[qua].fileSize
   } catch {
     try {
       let res = await youtubedlv2(args[0])
       isLimit = limit * 1024 < res.audio[qua].fileSize
     } catch {
       try {
         let res = await youtubedlv3(args[0])
         isLimit = limit * 1024 < res.audio[qua].fileSize
       } catch {
         let server = (args[1] || servers[0]).toLowerCase()
         let anu = await yta(args[0], servers.includes(server) ? server : servers[0])
         isLimit = limit * 1024 < anu.filesize 
       }
     }
   }
   let res = await youtubedl(args[0])
   let media 
   try { 
     media = await res.audio[qua].download()
   } catch {
     console.log('yt1 eror mencoba yt2')
     try {       
        let res2 = await youtubedlv2(args[0])
        media = await res2.audio[qua].download()
     } catch {
       console.log('yt2 eror mencoba yt3')
       try {
          let res3 = await youtubedlv2(args[0])
          media = await res3.audio[qua].download()
       } catch {
         console.log('yt1l3 eror mencoba yt4')
         let server = (args[1] || servers[0]).toLowerCase()
         let anu = await yta(args[0], servers.includes(server) ? server : servers[0])
         media = anu.dl_link
       }
     }
   }
   let anu
   if (isLimit) anu = `_File size above average ${limit} MB download it yourself_\n${await(await axios.get(`https://tinyurl.com/api-create.php?url=${media}`)).data}`                 
   else anu = `_Wait for the audio to be sent it may take a few minutes!_`
   let capt = `${set.sa}  *Y T   M P 3*
   
${set.sb} *Title* : ${res.title ? res.title : 'Not found'}
${set.sb} *Size* : ${res.audio[qua]?.fileSizeH ? res.audio[qua]?.fileSizeH : 'Not found'}
${set.sb} *Quality* : ${res.audio[qua]?.quality ? res.audio[qua]?.quality : 'Not found'}

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
   if (!isLimit) conn.sendFile(m.chat, media, res.title + '.mp3', res.title, sentMsg, null, { asDocument: doc, mentions: [m.sender] })
}
handler.help = ['ytmp3'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /(y(ou)?t(ube)?(a(udio)?|mpp?3|musik))$/i
handler.limit = true 
handler.desc = ['Mendownload media audio dari Youtube, gunakan perintah *#ytmp3 url* hilangkan tanda < >']
module.exports = handler
