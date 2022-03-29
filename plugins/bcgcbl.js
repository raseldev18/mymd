let handler = async (m, { conn, isROwner, text }) => {
    const delay = time => new Promise(res => setTimeout(res, time))
    let getGroups = await conn.groupFetchAllParticipating()
    let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
    let anu = groups.map(v => v.id)
    var pesan = m.quoted && m.quoted.text ? m.quoted.text : text
    if(!pesan) throw 'teksnya?'
    m.reply(`Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 0.5 } detik`)
    for (let i of anu) {
    await delay(500)
    conn.sendBL(i, `${pesan}`, `Created by @${owner[0]}`, fla + 'broadcast group', [[`Owner`, `.owner`], [`Menu`, `.menu`]], null, {mentions: [owner[0]+'@s.whatsapp.net']}).catch(_ => _)
    }
  m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgcbl <teks>']
handler.tags = ['owner']
handler.command = /^((broadcastgc|bcgc)bl)$/i

handler.owner = true

module.exports = handler
