let { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys-md')
const cheerio = require('cheerio')
const axios = require("axios")

let handler = async (m, { conn, args }) => {
conn.reply(m.chat, "Bntarr cuyy...", m)
    let link = ''
    a = await axios.get('https://ttdownloader.com/', {
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
        }
    })
    const $ = cheerio.load(a.data)
    let token = $('#token').attr('value')
    let config = {
        'url': args[0],
        'format': '',
        'token': token
    }
    await axios('https://ttdownloader.com/req/', {
        method: 'POST',
        data: new URLSearchParams(Object.entries(config)),
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
        }
    })
        .then(({ data }) => {
            const $ = cheerio.load(data)
            link += $('div:nth-child(2) > div.download > a').attr('href')
        })
    if (link.startsWith(`http`)) return conn.sendFile(m.chat, link, `tiktok-downloader.mp4`, wm, 0, { mimetype: 'video/gif'}, m)
        .catch((err) => {
            throw eror
        })
}
handler.help = ['tiktoknowm'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok(dl)?nowm|tt(dl)?nowm)$/i

handler.premium = true

module.exports = handler
