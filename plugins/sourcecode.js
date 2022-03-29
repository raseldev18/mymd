let handler = async (m, {conn}) => {
  let pp = let pp = await conn.profilePictureUrl(who, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
  conn.reply(m.chat, `Bot ini menggunakan script github
     
https://github.com/raselcomel/mymd
     
don't forget to give star ✨`, m, {
  contextInfo: { mentionedJid: [m.sender],
    externalAdReply :{
    mediaUrl: web,
    mediaType: 2,
    description: 'des', 
    title: `Hello ${m.name}`,
    body: wm, 
    thumbnail: await(await fetch(pp)).buffer()
   }}           
}) 
}
handler.help = ['sourcecode']
handler.tags = ['info']
handler.command = /^(sc(ript(bot)?)?|sourcecode)$/i

module.exports = handler


