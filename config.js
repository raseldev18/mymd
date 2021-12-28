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
  irwan: 'https://irwan-api1-xyz.herokuapp.com'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://irwan-api1-xyz.herokuapp.com': 'IrwanGans',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'chika-key',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}

//===========Sticker WM============//
global.packname = 'lucubot MD'
global.author = 'by instagram: @rasel.ganz' // this is my Instagram 😇

global.img = 'https://i.pinimg.com/originals/f0/67/f0/f067f00a885fab47d76d4e5423d54c35.jpg' // image 
global.fla = 'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text='


//========Url 1 Template Buttons=========//
global.dtu1 = 'Instagram My Owner'
global.urlnya1 = 'https://instagram.com/rasel.ganz'

//========Url 2 Template Buttons=========//
global.dtu2 = 'Group Bot WhatsApp'
global.urlnya2 = 'https://chat.whatsapp.com/CUCsW6BWfmJLJwJgPQIaKM'

//=============callButtons=============//
global.dtc = 'Add My Owner'
global.phn = '+62 853-4654-5126'


global.wm = '@rasel.ganz\n         ×͜×'
global.wait = '*「 ⏱️ 」Tunggu sebentar...*'
global.eror = '*「 📡 」Maaf server down...*'

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
