let handler = async(m, { conn }) => {
  try {
  const sentMsg = await conn.sendContactArray(m.chat, [
    [`${owner[0]}`, `${await conn.getName(owner[0]+'@s.whatsapp.net')}`, `👑 Developer Bot `, `🚫 Don't call me 😡`, `raselcomel18@gmail.com`, `🇮🇩 Indonesia`, `🛸 raselcomel.github.io`, `👤 Gada pawang nih senggol dong 😣`],
    [`${owner[1]}`, `${await conn.getName(owner[1]+'@s.whatsapp.net')}`, `Ayangnya rasel 😋`, `📵 Don't spam/call me 😡`, ``, ``, `🚀 https://instagram.com/rasel.ganz`, `🤖 Hanya bot biasa yang kadang suka eror ☺`]
    //[`${global.owner[2]}`, `Amirul`, ``, ``, ``, `🇮🇩 Indonesia`, ``, ``]
  ], m) 
  await conn.reply(m.chat, `Halo kak @${m.sender.split(`@`)[0]} itu nomor ownerku jangan di apa-apain ya kak😖`, sentMsg, {mentions: [m.sender]})
  } catch {
  const sentMsg = await conn.sendContact(m.chat, `${owner[0]}`, `${await conn.getName(owner[0]+'@s.whatsapp.net')}`, m) 
  await conn.reply(m.chat, `Halo kak @${m.sender.split(`@`)[0]} itu nomor ownerku jangan di apa-apain ya kak😖`, sentMsg, {mentions: [m.sender]})
  }
}
handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner)$/i

module.exports = handler
