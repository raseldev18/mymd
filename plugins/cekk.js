let handler = async(m, { conn }) => {
  m.reply('On!')
}
handler.customPrefix= /^(te?s|ce?k)$/i
handler.command = new RegExp

module.exports = handler
