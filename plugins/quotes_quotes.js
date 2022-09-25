let handler = async(m, { conn, usedPrefix, command, text, args }) => {
  if (!text) throw `${set.sb} *Example* : ${usedPrefix + command} rindu\n\n_Gesek pesan ini kekanan untuk mencari *quotes*_`
  m.react(('🌻 🌹 🥀 🌱 🌿 🌾 🍃').split(' ').getRandom())
  let res = await require('../lib/scrape.js').quotes(text)
  if (!res.status) throw `Quotes *${text}* tidak ditemukan!`
  let rand = res.data.getRandom()
  let caption = `*${set.sa} Q U O T E S*\n\n${rand.quote}`
  conn.sendButton(m.chat, caption, set.wm, set.fla + "quotes", [`Quotes ${text}`, `${usedPrefix + command} ${text}`], m, { asLocation: true })       
}
handler.help = ['quotes']
handler.tags = ['quotes']
handler.command =/^(quotes?)$/i
handler.limit = true
module.exports = handler
