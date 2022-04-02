let handler = async (m, {conn}) => {
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  conn.reply(m.chat, `Bot ini menggunakan script github
     
https://github.com/raselcomel/mymd
 
donate: 085346545126 (Dana)ツ
don't forget to give star ✨`, m, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: '',
    mediaType: 2,
    description: 'des', 
    title: `Hello ${m.name}`,
    body: wm, 
    thumbnail: await(await fetch(pp)).buffer(),
    sourceUrl: 'https://raselcomel.github.io/'
   }}           
}) 
}
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = /^(sc(ript(bot)?)?|sourcecode)$/i

module.exports = handler


