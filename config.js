global.owner = ['6285346545126'] // Put your number here
global.mods = ['6285346545126'] // Want some help?
global.prems = ['6285346545126'] // Premium user has unlimited limit
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  bg: 'http://bochil.ddns.net',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com',
  neoxr: 'https://neoxr-api.herokuapp.com',
  lolhum: 'https://api.lolhuman.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://api.xteam.xyz': 'yourapikey',
  'https://api.lolhuman.xyz': 'yourapikey',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'chika-key',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}

//===========Sticker WM============//
global.packname = 'bot-md'
global.author = 'instagram\n@rasel.ganz' // this is my Instagram 😇

global.wm = '@rasel.ganz'
global.wait = '*Tunggu sebentar ya sayang*'
global.eror = '*Maaf server sedang sibuk*'

//========Url 1 Template Buttons=========//
global.dtu1 = 'Instagram Owner'
global.urlnya1 = 'https://instagram.com/rasel.ganz'

//========Url 2 Template Buttons=========//
global.dtu2 = 'Group Bot WhatsApp'
global.urlnya2 = 'https://chat.whatsapp.com/CUCsW6BWfmJLJwJgPQIaKM'

//=============callButtons=============//
global.dtc = 'Add Me'
global.phn = '+62 822-5604-8971'


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

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
