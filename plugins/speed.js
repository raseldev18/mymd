let os = require('os')
let util = require('util')
let osu = require('node-os-utils')
let fetch = require('node-fetch')
let { performance } = require('perf_hooks')
let { sizeFormatter } = require('human-readable')
let format = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    //return [h+' Hour ', m+' Minute ', s+' Second'].map(v => v.toString().padStart(2, 0)).join(' ')
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
  }
let handler = async (m, { conn, command }) => {
        m.reply(`_Testing speed..._`)
	let fgif = {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast" } : {})},message: {"videoMessage": { "title": `Anu`, "h": `Hmm`,'seconds': '359996400', 'gifPlayback': 'true', 'caption': `${await conn.getName("6285346545126-1629709306@g.us")}\nPowered by ${await conn.getName("0@s.whatsapp.net")}\nCreated by ${wm}`, 'jpegThumbnail': await(await fetch(img)).buffer()}}}
	let NotDetect = 'Not Detect'
        let cpux = osu.cpu
        let cpuCore = cpux.count()
        let drive = osu.drive
        let mem = osu.mem
        let netstat = osu.netstat
        let HostN = osu.os.hostname()
        let OS = osu.os.platform()
        let ipx = osu.os.ip()
        let cpuModel = cpux.model()
        let cpuPer
        let p1 = cpux.usage().then(cpuPercentage => {
            cpuPer = cpuPercentage
        }).catch(() => {
            cpuPer = NotDetect
        })
        let driveTotal, driveUsed, drivePer
        let p2 = drive.info().then(info => {
                driveTotal = (info.totalGb + ' GB'),
                driveUsed = info.usedGb,
                drivePer = (info.usedPercentage + '%')
        }).catch(() => {
                driveTotal = NotDetect,
                driveUsed = NotDetect,
                drivePer = NotDetect
        })
        let ramTotal, ramUsed
        let p3 = mem.info().then(info => {
                ramTotal = info.totalMemMb,
                ramUsed = info.usedMemMb
        }).catch(() => {
                ramTotal = NotDetect,
                ramUsed = NotDetect
        })
        let netsIn, netsOut
        let p4 = netstat.inOut().then(info => {
                netsIn = (info.total.inputMb + ' MB'),       
                netsOut = (info.total.outputMb + ' MB')
        }).catch(() => {
                netsIn = NotDetect,
                netsOut = NotDetect
        })
        await Promise.all([p1, p2, p3, p4])        
        let _ramTotal = (ramTotal + ' MB')
  const used = process.memoryUsage()
  const cpus = os.cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })
  let cek = await(await fetch("https://api.myip.com")).json()
  let ip = cek.ip
  let cr = cek.country
  let cc = cek.cc
  let old = performance.now()
  let neww = performance.now()
  let speed = neww - old
  let more = String.fromCharCode(8206)
  let readMore = more.repeat(4001)
  let _uptime = process.uptime() * 1000
  let _muptime
  if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
  let muptime = clockString(_muptime)
  let uptime = clockString(_uptime)
  let d = new Date(new Date + 3600000)
    let locale = `${cc}`
    let weeks = d.toLocaleDateString(locale, { weekday: 'long' })
    let dates = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let times = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let timez = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss')
  let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
  let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {day: 'numeric', month: 'long', year: 'numeric'}).format(d)  
  let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw, statusUpdate, autogetmsg, antivirus, publicjoin } = global.db.data.settings[conn.user.jid]
  let chats = Object.keys(conn.chats).filter(v => v.endsWith('s.whatsapp.net')).map(v => v)
  let a = await conn.groupFetchAllParticipating()
  let b = Object.entries(a).slice(0).map(entry => entry[1])
  let groups = b.map(v => v.id)
  let groupsIn = groups.filter(v => !v.read_only).length 
  let blok = await conn.fetchBlocklist()
  let goblock = blok.length
  let txt = `Merespon dalam ${speed} millidetik
${readMore}
💬 *Chat Info:*
• *${groups.length}* Group Chats
• *${groupsIn}* Groups Joined
• *${groups.length - groupsIn}* Groups Left
• *${chats.length - groups.length}* Personal Chats
• *${chats.length}* Total Chats
• *${goblock}* Terblock
• *${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length}* Chat Terbanned
• *${Object.entries(global.db.data.users).filter(user => user[1].banned).length}* Pengguna Terbanned

🤖 *Bot Setting:* ${readMore}
${anon ? '✅' : '❌'} *Anonymous*
${anticall ? '✅' : '❌'} *Anti Call*
${antispam ? '✅' : '❌'} *Anti Spam*
${antitroli ? '✅' : '❌'} *Anti Troli*
${backup ? '✅' : '❌'} *Auto Backup DB*
${groupOnly ? '✅' : '❌'} *Mode Grup*
${jadibot ? '✅' : '❌'} *Jadi Bot*
${nsfw ? '✅' : '❌'} *Mode Nsfw*
${statusUpdate ? '✅' : '❌'} *Auto Update Stats (Bio)* 
${autogetmsg ? '✅' : '❌'} *Auto Get Message*
${publicjoin  ? '✅' : '❌'} *Public Join*
${antivirus  ? '✅' : '❌'} *Anti Virus*

💻 *Server Info:*
RAM: *${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}*
OS: *${OS}*
IP: *${ip}*
Country: *${cr}*
Country Code: *${cc}*
HOSTNAME: *${HostN}*
CPU Model: *${cpuModel}*
CPU Core: *${cpuCore} Core*
CPU: *${cpuPer}%*
Ram: *${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})*
Drive: *${driveUsed} / ${driveTotal} (${drivePer})*
Ping: *${speed} ms*
Internet IN: *${netsIn}*
Internet OUT: *${netsOut}*
Runtime : *${uptime} / (${muptime})*
Time Server: *${times}*

_NodeJS Memory Usage_
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`
  conn.sendB(m.chat, txt, wm, null, [['Speed Test', '.speedtest']], 0, {mentions: [m.sender]}) 
}
handler.help = ['speed']
handler.tags = ['info']
handler.command = /^(ping|spe?e?d)$/i

module.exports = handler
