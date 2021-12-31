let handler = async (m, { text }) => {
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let kon = `*Jumlah database saat ini ${totalreg} user*\n*User registrasi saat ini ${rtotalreg} user*`
    await sock.sendTemplateButtonLoc(m.chat, kon, wm, await(await require('node-fetch')(fla + `${text}`)).buffer(), 'Menu', '#menu', m)
}
handler.help = ['user']
handler.tags = ['info']
handler.command = /^(database|jumlahdatabase|user)$/i
module.exports = handler
