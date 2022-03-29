let handler = async(m, { conn }) => {
  try {
  const sentMsg = await conn.sendContactArray(m.chat, [
    [`${owner[0]}`, `${await conn.getName(owner[0]+'@s.whatsapp.net')}`, `👑 Developer Bot `, `🚫 Don't call me 😡`, `raselcomel18@gmail.com`, `🇮🇩 Indonesia`, `🚀 https://raselcomel.github.io/`, `👤 Gada pawang nih senggol dong 😣`],
    [`${owner[1]}`, `${await conn.getName(owner[1]+'@s.whatsapp.net')}`, `👑 Developer Bot `, `📵 Don't spam/call me 😡`, `mr.familia13@gmail.com`, `🇮🇩 Indonesia`, `🚀 https://instagram.com/aguzfamilia`, `👤 Hanya seseoarng biasa yang kadang butuh perhatian ☺`],
    [`${owner[2]}`, `${await conn.getName(owner[2]+'@s.whatsapp.net')}`, `👑 Developer Bot `, `🚫 Don't call me 😡`, `aniqshehyar1@gmail.com`, `🇮🇩 Indonesia`, `🚀 https://github.com/aniq12`, `👤 Gada pawang nih senggol dong 😣`],
    [`${owner[3]}`, `${await conn.getName(owner[3]+'@s.whatsapp.net')}`, `👑 Developer Bot `, `🚫 Don't call me 😡`, `amirul@skyn.tech`, `🇮🇩 Indonesia`, `🚀 https://github.com/amiruldev20`, `👤 Sudah ada pawang banh 😣`]
  ], m) 
  await conn.reply(m.chat, `Halo kak @${m.sender.split(`@`)[0]} itu nomor team developerku, jangan di apa-apain ya kak😖`, sentMsg, {mentions: [m.sender]})
  } catch {
  const sentMsg = await conn.sendContact(m.chat, `${owner[0]}`, `${await conn.getName(owner[0]+'@s.whatsapp.net')}`, m) 
  await conn.reply(m.chat, `Halo kak @${m.sender.split(`@`)[0]} itu nomor team developerku, jangan di apa-apain ya kak😖`, sentMsg, {mentions: [m.sender]})
  }
}
handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner)$/i

module.exports = handler

