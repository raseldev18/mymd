let handler = async(m, { conn, usedPrefix }) => {
  let list = Object.values(plugins).filter(v => v.tags == "game").map(v => v.help).flat(1).map(v => v.split(' ')[0])
  let row = []
  for (const name of list) {
    row.push({
      title: name.capitalize(), // jika list angka di awali huruf kecil otomatis kapital
      rowId: usedPrefix + name
    })
  }
  conn.sendListM(m.chat, `${set.sa} G A M E S\n`, `Halo @${parseInt(m.sender)}\nSilah pilih game faforitmu dibawah!`, set.wm, row, m)                
}
handler.help = ['game']
handler.tags = ['main']
handler.command = ['game', 'games', 'permainan']
handler.exp = 0
module.exports = handler
