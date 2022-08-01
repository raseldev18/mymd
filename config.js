let fs = require('fs')
//============== Data jid =============//
global.owner = JSON.parse(fs.readFileSync('./src/owner.json')) // Change/add owner number => src/owner.json
global.mods = JSON.parse(fs.readFileSync('./src/moderator.json')) // Moderator?
global.prems = JSON.parse(fs.readFileSync('./src/premium.json')) // Premium user has unlimited limit
//====== Needed in plugin/update.js ======//
global.repox = 'raselcomel/RxR-Bot'
global.branx = 'master'
//=========== Watermark & Url ==========//
global.wm = '© alyatzy'
global.wmtitle = '🌹 𝑪𝒐𝒎𝒆𝒍⋆𝑩𝒐𝒕 ⚚'
global.wmbody = '🍃 by ༆ alya  ཽ ྀ ྭ ྱ ྲ ཻ' 
global.wmlink = 'https://www.instagram.com/rasel.ganz'
global.linkgc = 'https://chat.whatsapp.com/CUCsW6BWfmJLJwJgPQIaKM'
global.linkmed = 'https://www.instagram.com/p/CH1A1c9J5pY/?utm_medium=copy_link'

//=========== Process Bot ============//
global.wait = 'Tunggu sebentar ya sayang'
global.eror = 'Maaf terjadi kesalahan, silahkan coba lagi nanti'

//========= Url Template Button =========//
global.dTux = 'WEBSITE'
global.uRlx = 'bit.ly/AcellComel' //''
//========= Call Template Button =========//
global.dTcx = 'Add Me'
global.nUmx = '+62 818-0262-6071' 
//================ Buttons ================//
global.bTnx = [['DASHBOARD', '.say blum pasang:v']] //buttons map
global.mediaMenu = 'https://telegra.ph/file/505b2a03d98bb3b8680e7.jpg'
global.lIm = 'Ⓛ'
global.pRm = 'Ⓟ'
global.uRl = 'Ⓤ'
global.tXt = 'Ⓣ'
global.nUm = 'Ⓝ'
global.qRy = 'Ⓠ'
global.uSr = '@Ⓤ'
global.oPs = 'Ⓞ'

global.APIs = { // API Prefix
//======= name: 'https://website' ========//
  nrtm: 'https://nurutomo.herokuapp.com',
  lolhum: 'https://api.lolhuman.xyz',
  xteam: 'https://api.xteam.xyz', 
  violet: 'https://violetics.pw'
}
global.APIKeys = { // APIKey Here
//======= 'https://website': 'apikey' =======//
  'https://api.lolhuman.xyz': 'Papah-Chan',
  'https://api.xteam.xyz': 'benniismaelapikey',
  'https://violetics.pw': '0b55-fada-712f'
}

//=========== Sticker WM =============//
const spack = fs.readFileSync("lib/exif.json")
const stickerpack = JSON.parse(spack)
if (stickerpack.spackname == '') {
  var sticker_name = ''
  var sticker_author = '               by\nalyaxzy'
 } else {
  var sticker_name = stickerpack.spackname
  var sticker_author = stickerpack.sauthor
}
const file_exif = "lib/exif.json"
fs.watchFile(file_exif, () => {
  fs.unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  delete require.cache[file_exif]
  require('./lib/exif.json')
})
global.packname = sticker_name
global.author = sticker_author
//====== Sticker take(colong stiker:v) ======//
const cpack = fs.readFileSync("lib/colong.json")
const ctickerpack = JSON.parse(cpack)
if (ctickerpack.cpackname == '') {
  var colong_name = 'sikilinsut olang nylong tikell'
  var colong_author = 'Ciss 📸\n\n\n\n\n\n\n\n\n\n\n\n@alya'
 } else {
  var colong_name = ctickerpack.cpackname
  var colong_author = ctickerpack.cauthor
}
const file_colong = "lib/colong.json"
fs.watchFile(file_colong, () => {
  fs.unwatchFile(file_colong)
  console.log(chalk.redBright("Update 'colong.json'"))
  delete require.cache[file_colong]
  require('./lib/colong.json')
})
global.pclg = colong_name
global.aclg = colong_author

//======== Fake Size ========//
global.fsx  = 9999999999999  //fake size foto/video
global.fsdx = 9999999999999  //fake size document 
global.pcdx = 9999999999999  // fake page count document

global.multiplier = 69 // The higher, The harder levelup
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      sampah: '🗑',
      armor: '🥼',
      sword: '⚔️',
      kayu: '🪵',
      batu: '🪨',
      string: '🕸️',
      kuda: '🐎',
      kucing: '🐈' ,
      anjing: '🐕',
      petFood: '🍖',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
