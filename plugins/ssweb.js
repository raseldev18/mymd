let handler = async(m, { conn, usedPrefix, command, args }) => {
  var fetch = require('node-fetch')
  var axios = require('axios')
  if(!args[0]) throw `Linknya mana?`
  let capt = `📸 *Screenshot Web*\n\n `+args[0]
  try {
  let full = /f$/i.test(command)
  let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
  let ss = await(await fetch(API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).buffer()
  await conn.sendFile(m.chat, ss, 'ss.png', capt, m, 0, {jpegThumbnail: ss})
  } catch {
  try {
  let ss1 = await(await fetch(`https://mnazria.herokuapp.com/api/screenshotweb?url=${args[0]}`)).buffer()
  await conn.sendFile(m.chat, ss1, 'ss.png', capt, m, 0, { jpegThumbnail: ss1})
  } catch {
  try { 
  let res = await(await fetch(`https://mnazria.herokuapp.com/api/screenshotweb?url=${args[0]}`)).json()
  let ss2 = await(await fetch(res.gambar)).buffer()
  await conn.sendFile(m.chat, ss2, 'ss.png', m, 0, { jpegThumbnail: ss2})
  } catch {
  try { 
  let ss3 = await(await fetch(`https://hardianto.xyz/api/tools/ssweb?url=${args[0]}&apikey=hardianto`)).buffer()
  await conn.sendFile(m.chat, ss3, 'ss.png', m, 0, {jpegThumbnail: ss3})
  } catch {
    let er = await conn.trans(lang, eror).catch(async _ => await conn.trans2(lang, eror))
    return m.reply(er)
         //https://hardianto.xyz/api/tools/ssweb?url=https://xnxx.com&apikey=hardianto
        }
      }
    }
  }
}
handler.help = ['ssweb']
handler.tags = ['internet']
handler.command = /^ssf?(web)?|scre?e?nshu?o?t$/i

module.exports = handler
