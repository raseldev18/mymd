let fs = require('fs')
let chalk = require('chalk')
global.owner = [
  ['6285346545126', 'Acel', true],
  // [number, dia creator/owner?, dia developer?]
  JSON.parse(fs.readFileSync('./src/owner.json'))
] // Put your number here
global.mods = JSON.parse(fs.readFileSync('./src/moderator.json')) 
global.prems = JSON.parse(fs.readFileSync('./src/premium.json'))

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
const stick = JSON.parse(fs.readFileSync("lib/exif.json"))
if (stick.spackname == '' || stick.sauthor == '') {
  var sticker_name = 'Made with WeA Bot'
  var sticker_author = '𝖻𝗂𝗍.𝗅𝗒/𝖠𝖼𝖾𝗅𝗅𝖢𝗈𝗆𝖾𝗅'
} else {
  var sticker_name = stick.spackname
  var sticker_author = stick.sauthor
}
const weem = JSON.parse(fs.readFileSync("lib/wm.json"))
if (weem.watermark == '') {
  var hias_watermark = 'ᴡᴇᴀ ʙᴏᴛ ʙʏ ʀᴀsᴇʟ ⌤'
} else {
  var hias_watermark = weem.watermark
} 
const symbol = JSON.parse(fs.readFileSync("lib/symbol.json"))
if (symbol.symbol == '') {
  var hias_symbol = '•'
} else {
  var hias_symbol = symbol.symbol
} 
global.packname = sticker_name 
global.author = sticker_author
global.wm = hias_watermark
global.sYm = hias_symbol
let list = `Angka
Asahotak
Caklontong 
Family100
Koboy
Siapakahaku
Suitbot
Susunkata
Tebakgambar
Tebakkata
Tebaklirik
Tekateki`
let jsongame = list.split('\n')
let game = []
for (let name of jsongame) {
     game.push({
       title: name,
       rowId: '.' + name,
     })
}
global.gamelist = {
    title: 'Silahkan Pilih Game Favorit-mu!',
    rows: game
}

global.multiplier = 69 // The higher, The harder levelup
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      name: '🐤',
      age: '🌴',
      premium: '🔥',
      tag: '🐋',
      number: '✨',
      wame: '🌹',
      rank: '🔱',
      before: '🕊',
      after: '🦅',
      atm: '🏧',
      warning: '⚠️',
      level: '🧬',
      limit: '🌌',
      health: '❤️',
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '⚔️',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈',
      dog: '🐕',
      fox: '🦊',
      petFood: '🍖',
      iron: '⛓️',
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

let file_exif = "lib/exif.json"
fs.watchFile(file_exif, () => {
  fs.unwatchFile(file_exif)
  console.log(chalk.redBright("Update 'exif.json'"))
  delete require.cache[file_exif]
  require('./lib/exif.json')
})

let file_wm = "lib/wm.json"
fs.watchFile(file_wm, () => {
  fs.unwatchFile(file_wm)
  console.log(chalk.redBright("Update 'wm.json'"))
  delete require.cache[file_wm]
  require('./lib/wm.json')
})

let file_symbol = "lib/symbol.json"
fs.watchFile(file_symbol, () => {
  fs.unwatchFile(file_symbol)
  console.log(chalk.redBright("Update 'symbol.json'"))
  delete require.cache[file_symbol]
  require('./lib/symbol.json')
})
