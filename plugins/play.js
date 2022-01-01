const {
    //default: makeWASocket,
    //useSingleFileAuthState,
    WAMessage,
    proto,
    generateWAMessageFromContent
  } = require('@adiwajshing/baileys-md')
const { servers, yta, ytv } = require('../lib/y2mate')
let yts = require('yt-search')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `uhm.. cari apa?\n\ncontoh:\n${usedPrefix + command} i see your monster`
  let chat = global.db.data.chats[m.chat]
  conn.reply(m.chat, wait, m) 
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Konten Tidak ditemukan'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\nmencoba server lain...'}`)
    }
  }
  if (yt === false) throw 'semua server gagal'
  if (yt2 === false) throw 'semua server gagal'
  let { dl_link, thumb, title, filesize, filesizeF } = yt
  let konrasel = `*───「 YT Downloader 」───*
  
*Judul:* ${title}
*Ukuran File Audio:* ${filesizeF}
*Ukuran File Video:* ${yt2.filesizeF}
*Server y2mate:* ${usedServer}`
const template = generateWAMessageFromContent(m.key.remoteJid, proto.Message.fromObject({
        templateMessage: {
            hydratedTemplate: {
                locationMessage: { jpegThumbnail: await (await fetch(thumb)).buffer()},
                hydratedContentText: konrasel.trim(),
                hydratedFooterText: wm,
                hydratedButtons: [{
                  index: 0,
                   urlButton: {
                        displayText: '🌏 Url YouTube',
                        url: `${vid.url}`
                    }
                }, {
                   quickReplyButton: {
                        displayText: `🎵 Audio`,
                        id: `.yta ${vid.url}`
                    }
                }, {
                   quickReplyButton: {
                        displayText: `📽 Video`,
                        id: `.ytv ${vid.url}`
                    }
                }, {
                    quickReplyButton: {
                        displayText: `🔎 YT Search ${text}`,
                        id: `.yts ${text}`
                    },
                    selectedIndex: 1
                }]
            }
        }
    }), { userJid: m.participant || m.key.remoteJid, quoted: m });
    return await conn.relayMessage(
        m.key.remoteJid,
        template.message,
        { messageId: template.key.id }
    )
//await sock.send3Template2UrlButtonLoc(m.chat,capt.trim(), wm, await (await fetch(thumb)).buffer(), 'Video', `.ytv ${vid.url}`, 'Audio', `.yta ${vid.url}`, 'Menu', '#menu', m)
}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(dj|musik|song|lagu|p(lay)?)$/i

handler.exp = 3

module.exports = handler
