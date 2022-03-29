let handler = async (m, { conn, usedPrefix, command }) => {
  try {
  var {age} = db.data.users[m.sender]
  if (age <17) throw conn.reply(m.chat, 'Lu masih di bawah umur jangan dulu deh', m) 
  let res = await fetch('https://api.waifu.pics/nsfw/neko')
  if (!res.ok) throw m.reply(eror)
  let json = await res.json()
  //if (!json.url) throw m.reply(eror)
  conn.sendBI(m.chat, `Nihh @${m.sender.split('@')[0]} jangan sagne ya!`, wm, json.url, [[`Next`, `${usedPrefix}${command}`]], m, {mentions: [m.sender], jpegThumbnail: await(await fetch(json.url)).buffer() })
  } catch {
    //m.reply(eror)
  }
}
handler.help = ['nsfwneko']
handler.tags = ['nsfw']
handler.command = /^(nsfwneko|nekonsfw)$/i

handler.private = true
handler.limit = true
handler.register = true

module.exports = handler
