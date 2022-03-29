let handler = async (m, { conn,isOwner, isROwner, text }) => {
   conn.sendTB(m.chat, 'Mau Up Ke Premium?\nSilahkan hubungi nomor owner di bawah!', wm, 'Chat Owner', `https://wa.me/${global.owner[0]}?text=Assalamu'alaikum`, null, null, null, null, null, null, null, m)
}

handler.help = ['uptoprem']
handler.tags = ['main']
handler.command = /^(up(to)?prem(ium)?)$/i

module.exports = handler
