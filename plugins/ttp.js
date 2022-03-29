let handler = async (m, { conn, text }) => {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : 'teksnya mana?'
  //let sel = global.API('xteam', '/ttp', { file: '', text: teks })
  let sel = `https://raterian.sirv.com/New%20Project.png?text.0.text=${teks}&text.0.position.y=-35%25&text.0.color=ffffff&text.0.font.family=Poppins&text.0.font.weight=800&text.0.outline.color=000000&text.0.outline.width=1`
  conn.sendStimg(m.chat, sel, null, {packname: packname, author: author, mentions: [m.sender]})
}
handler.help = ['ttp <teks>']
handler.tags = ['sticker']

handler.command = /^ttp$/i

module.exports = handler
