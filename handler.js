let { Presence } = require('@adiwajshing/baileys')
let { performance } = require('perf_hooks')
const simple = require('./lib/simple')
const util = require('util')

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

const more = String.fromCharCode(8206)
global.readMore = more.repeat(4001)

module.exports = {
    async handler(chatUpdate) {
        if (global.db.data == null) await loadDatabase()
        this.msgqueque = this.msgqueque || []
        // console.log(chatUpdate)//
        if (!chatUpdate) return
        // if (chatUpdate.messages.length > 2 || !chatUpdate.messages.length) return
        if (chatUpdate.messages.length > 1) console.log(chatUpdate.messages)
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        let d = new Date(new Date + 3600000)
        const hariRaya = new Date('December 31, 2022 23:59:59')
        const sekarang = new Date().getTime()
        const Selisih = hariRaya - sekarang
        const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
        const jjam = Math.floor(Selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
        const mmmenit = Math.floor(Selisih % (1000 * 60 * 60) / (1000 * 60))
        const ddetik = Math.floor(Selisih % (1000 * 60) / 1000)
        const ultahh = new Date('March 9, 2022 23:59:59')
        const sekarat = new Date().getTime()
        const Kurang = ultahh - sekarat
        const ohari = Math.floor(Kurang / (1000 * 60 * 60 * 24));
        const ojam = Math.floor(Kurang % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
        const onet = Math.floor(Kurang % (1000 * 60 * 60) / (1000 * 60))
        const detek = Math.floor(Kurang % (1000 * 60) / 1000)
        let locale = 'id'
        let old = performance.now()
        let neww = performance.now()
        global.speed = neww - old + ' ms'
        global.delay = time => new Promise(res => setTimeout(res, time))
        global.ulangTahun = `Kurang ${ohari} Hari ${ojam} Jam ${onet} Menit ${detek} Detik Lagi Ultah ku 🥰`
        global.tahunBaru = `Kurang ${jhari} Hari ${jjam} Jam ${mmmenit} Menit ${ddetik} Detik Lagi Tahun Baru 🥳`
        global.week = d.toLocaleDateString(locale, { weekday: 'long' })
        global.date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
        global.weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
        global.dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
        global.user = Object.keys(global.db.data.users).length
        global.users = Object.values(global.db.data.users).filter(user => user.registered == true).length
        let _uptime = process.uptime() * 1000
        global.uptime = clockString(_uptime)
        global.sock = conn
        global.namabot = conn.user.name
        
        let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
        let nek = ne.split('\n')
        let neko = pickRandom(nek)

        global.img = neko // pickRandom(global.waifu)
        global.fla = pickRandom(global.flaaa)
        global.thumbr1 = pickRandom(neko)
        global.thumbr2 = pickRandom(neko)
        global.thumbx = pickRandom(global.tmbnld)
        global.thumbd = pickRandom(global.tmbnld)
        global.thumbt = pickRandom(global.tmbnld)
        global.thumbb = pickRandom(neko)

        let jax = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        let jbx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        let jcx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        let jdx = 'application/pdf'
        let jex = 'text/rtf'

        global.td = pickRandom([jax, jbx, jcx, jdx, jex])
        global.docux = img
        global.nd = pickRandom(['@rasel.ganz', 'rasel ganz', 'rasel comel ', 'rasel', '𝓇𝒶𝓈ℯ𝓁', '𝑟𝑎𝑠𝑒𝑙', '𝒓𝒂𝒔𝒆𝒍', '𝐫𝐚𝐬𝐞𝐥', '𝔯𝔞𝔰𝔢𝔩', '𝖗𝖆𝖘𝖊𝖑', '𝕣𝕒𝕤𝕖𝕝', '𝚛𝚊𝚜𝚎𝚕', 'r̸a̸s̸e̸l̸', 'r༙a༙s༙e༙l༙', 'r͜͡a͜͡s͜͡e͜͡l͜͡', 'rྂaྂsྂeྂlྂ', 'rཽaཽsཽeཽlཽ', 'r̽aྂsཽe͠ ʟ', 'ʳᵃˢᵉˡ'])
        global.time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss')

        if (!m) return
        //console.log(JSON.stringify(m, null, 4))
        try {
            m = simple.smsg(this, m) || m
            if (!m) return
            // console.log(m)
            m.exp = 0
            m.limit = false
            let langx
            if (m.sender.startsWith('62' || '60')) langx = 'id'
            else langx = 'en'
            try {
                let user = global.db.data.users[m.sender]
                if (typeof user !== 'object') global.db.data.users[m.sender] = {}
                if (user) {
                    if (!isNumber(user.healt)) user.healt = 0
                    if (!isNumber(user.level)) user.level = 0
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.title)) user.title = ''
                    if (!isNumber(user.limit)) user.limit = 20
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (!isNumber(user.lastjoin)) user.lastjoin = 0
                    if (!isNumber(user.money)) user.money = 0

                    if (!isNumber(user.diamond)) user.diamond = 0
                    if (!isNumber(user.iron)) user.iron = 0

                    if (!isNumber(user.common)) user.common = 0
                    if (!isNumber(user.uncommon)) user.uncommon = 0
                    if (!isNumber(user.mythic)) user.mythic = 0
                    if (!isNumber(user.legendary)) user.legendary = 0
                    if (!isNumber(user.pet)) user.pet = 0

                    if (!isNumber(user.potion)) user.potion = 0
                    if (!isNumber(user.sampah)) user.sampah = 0
                    if (!isNumber(user.armor)) user.armor = 0

                    if (!isNumber(user.kucing)) user.kucing = 0
                    if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
                    if (!isNumber(user.kuda)) user.kuda = 0
                    if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0
                    if (!isNumber(user.rubah)) user.rubah = 0
                    if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0
                    if (!isNumber(user.anjing)) user.anjing = 0
                    if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0

                    if (!isNumber(user.anakkucing)) user.anakkucing = 0
                    if (!isNumber(user.anakkuda)) user.anakkuda = 0
                    if (!isNumber(user.anakrubah)) user.anakrubah = 0
                    if (!isNumber(user.anakanjing)) user.anakanjing = 0
                    if (!isNumber(user.makananpet)) user.makananpet = 0

                    if (!isNumber(user.antispam)) user.antispam = 0
                    if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0

                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!isNumber(user.batu)) user.batu = 0
                    if (!isNumber(user.string)) user.string = 0
                    if (!isNumber(user.sword)) user.sword = 0
                    if (!isNumber(user.sworddurability)) user.sworddurability = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0
                    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                    if (!isNumber(user.fishingrod)) user.fishingrod = 0
                    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0

                    if (!isNumber(user.paus)) user.paus = 0
                    if (!isNumber(user.kepiting)) user.kepiting = 0
                    if (!isNumber(user.gurita)) user.gurita = 0
                    if (!isNumber(user.cumi)) user.cumi = 0
                    if (!isNumber(user.buntal)) user.buntal = 0
                    if (!isNumber(user.dory)) user.dory = 0
                    if (!isNumber(user.lumba)) user.lumba = 0
                    if (!isNumber(user.lobster)) user.lobster = 0
                    if (!isNumber(user.hiu)) user.hiu = 0
                    if (!isNumber(user.udang)) user.udang = 0
                    if (!isNumber(user.ikan)) user.ikan = 0
                    if (!isNumber(user.orca)) user.orca = 0

                    if (!isNumber(user.lastadventure)) user.lastadventure = 0
                    if (!isNumber(user.lastfishing)) user.lastfishing = 0
                    if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
                    if (!isNumber(user.lastduel)) user.lastduel = 0
                    if (!isNumber(user.lastmining)) user.lastmining = 0
                    if (!isNumber(user.lasthunt)) user.lasthunt = 0
                    if (!isNumber(user.lastweekly)) user.lastweekly = 0
                    if (!isNumber(user.lastmonthly)) user.lastmontly = 0
                    if (!('registered' in user)) user.registered = false
                    if (!('language' in user)) user.language = langx // 'id'
                    if (!user.registered) {
                        if (!('name' in user)) user.name = this.getName(m.sender)
                        if (!isNumber(user.age)) user.age = -1
                        if (!isNumber(user.regTime)) user.regTime = -1
                    }
                    if (!isNumber(user.warn)) user.warn = 0
                    if (!isNumber(user.afk)) user.afk = -1
                    if (!('afkReason' in user)) user.afkReason = ''
                    if (!('autolevelup' in user)) user.autolevelup = false
                    if (!('banned' in user)) user.banned = false
                    if (!('level' in user)) user.level = 0
                    if (!('premium' in user)) user.premium = false
                    if (!isNumber(user.premiumTime)) user.premiumTime = 0
                    if (!user.role) user.role = 'Bronze'
                    if (!('sw' in user)) user.sw = false
                    if (!('pasangan' in user)) user.pasangan = ''
                    if (!('autodownload' in user)) user.autodownload = true
                    if (!('simi' in user)) user.simi = false
                } else global.db.data.users[m.sender] = {
                    healt: 100,
                    level: 0,
                    title: '',
                    exp: 0,
                    limit: 20,
                    lastclaim: 0,
                    lastjoin: 0,
                    money: 0,
                    diamond: 0,
                    iron: 0,
                    common: 0,
                    uncommon: 0,
                    mythic: 0,
                    legendary: 0,
                    pet: 0,
                    potion: 0,
                    sampah: 0,
                    armor: 0,
                    kucing: 0,
                    as: 0,
                    paus: 0,
                    kepiting: 0,
                    gurita: 0,
                    cumi: 0,
                    buntal: 0,
                    dory: 0,
                    lumba: 0,
                    lobster: 0,
                    hiu: 0,
                    udang: 0,
                    ikan: 0,
                    orca: 0,
                    kucinglastclaim: 0,
                    kuda: 0,
                    kudalastclaim: 0,
                    rubah: 0,
                    rubahlastclaim: 0,
                    anjing: 0,
                    anjinglastclaim: 0,
                    afkReason: '',
                    anakkucing: 0,
                    anakkuda: 0,
                    anakrubah: 0,
                    anakanjing: 0,
                    makananpet: 0,
                    antispam: 0,
                    antispamlastclaim: 0,
                    kayu: 0,
                    batu: 0,
                    string: 0,
                    sword: 0,
                    sworddurability: 0,
                    pickaxe: 0,
                    pickaxedurability: 0,
                    fishingrod: 0,
                    fishingroddurability: 0,
                    lastadventure: 0,
                    lastfishing: 0,
                    lastdungeon: 0,
                    lastduel: 0,
                    lastmining: 0,
                    lasthunt: 0,
                    lastweekly: 0,
                    lastmonthly: 0,
                    registered: false,
                    language: langx, //'id',
                    name: this.getName(m.sender),
                    age: -1,
                    regTime: -1,
                    warn: 0,
                    afk: -1,
                    afkReason: '',
                    autolevelup: false,
                    banned: false,
                    level: 0,
                    premium: false,
                    premiumTime: 0,
                    role: 'Bronze',
                    sw: false,
                    pasangan: '',
                    autodownload: true,
                    simi: false,
                }
                let chat = global.db.data.chats[m.chat]
                if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
                if (chat) {
                    if (!('isBanned' in chat)) chat.isBanned = false
                    if (!('welcome' in chat)) chat.welcome = true
                    if (!('detect' in chat)) chat.detect = true
                    if (!('sWelcome' in chat)) chat.sWelcome = ''
                    if (!('sBye' in chat)) chat.sBye = ''
                    if (!('sPromote' in chat)) chat.sPromote = ''
                    if (!('sDemote' in chat)) chat.sDemote = ''
                    if (!('descUpdate' in chat)) chat.descUpdate = true
                    if (!('delete' in chat)) chat.delete = false
                    if (!('antiBadword' in chat)) chat.antiBadword = true
                    if (!('rpg' in chat)) chat.rpg = true
                    if (!('nsfw' in chat)) chat.nsfw = false
                    if (!('stiker' in chat)) chat.stiker = false
                    if (!('antiBadword' in chat)) chat.antiBadword = true
                    if (!('antiLink' in chat)) chat.antiLink = false
                    if (!('antiVirtex' in chat)) chat.antiVirtex = true
                    if (!('antiToxic' in chat)) chat.antiToxic = true
                    if (!('antidelete' in chat)) chat.antidelete = false
                    if (!isNumber(chat.expired)) chat.expired = 0
                    if (!('viewonce' in chat)) chat.viewonce = false
                    if (!('autoread' in chat)) chat.autoread = false
                    if (!('clear' in chat)) chat.clear = false
                    if (!isNumber(chat.clearTime)) chat.clearTime = (new Date() * 1) + 3600000 * 1
                    if (!('autodownload' in chat)) chat.autodownload = true
                    if (!('getmsg' in chat)) chat.getmsg = true
                    if (!('simi' in chat)) chat.simi = false
                } else global.db.data.chats[m.chat] = {
                    isBanned: false,
                    welcome: true,
                    detect: true,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '',
                    sDemote: '',
                    descUpdate: true,
                    delete: false,
                    rpg: true,
                    nsfw: false,
                    stiker: false,
                    antiBadword: true,
                    antiLink: false,
                    antiVirtex: true,
                    antiToxic: true,
                    antidelete: false,
                    expired: 0,
                    viewonce: false,
                    autoread: false,
                    clear: false,
                    clearTime: (new Date() * 1) + 3600000 * 1,
                    autodownload: true,
                    getmsg: true,
                    simi: false,
                }
                let settings = global.db.data.settings[this.user.jid]
                if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
                if (settings) {
                    if (!'anon' in settings) settings.anon = true
                    if (!'anticall' in settings) settings.anticall = true
                    if (!'antispam' in settings) settings.antispam = true
                    if (!'antitroli' in settings) settings.antitroli = true
                    if (!'backup' in settings) settings.backup = false
                    if (!isNumber(settings.backupDB)) settings.backupDB = 0
                    if (!'groupOnly' in settings) settings.groupOnly = false
                    if (!'jadibot' in settings) settings.groupOnly = false
                    if (!'nsfw' in settings) settings.nsfw = true
                    if (!isNumber(settings.status)) settings.status = 0
                    if (!'statusUpdate' in settings) settings.statusUpdate = false
                    if (!'antivirus' in settings) settings.antivirus = false
                    if (!'publicjoin' in settings) settings.publicjoin = false
                    if (!'autogetmsg' in settings) settings.autogetmsg = true
                    if (!('tosw' in settings)) settings.tosw = global.owner[0] + '@s.whatsapp.net'
                } else global.db.data.settings[this.user.jid] = {
                    anon: true,
                    anticall: true,
                    antispam: true,
                    antitroli: true,
                    backup: false,
                    backupDB: 0,
                    groupOnly: false,
                    jadibot: false,
                    nsfw: true,
                    status: 0,
                    statusUpdate: false,
                    antivirus: false,
                    publicjoin: false,
                    autogetmsg: true,
                    tosw: global.owner[0] + '@s.whatsapp.net',
                }
            } catch (e) {
                console.error(e)
            }
            if (opts['nyimak']) return
            if (!m.fromMe && opts['self']) return
            if (opts['pconly'] && m.chat.endsWith('s.whatsapp.net')) return
            if (opts['gconly'] && !m.chat.endsWith('g.us')) return
            if (opts['swonly'] && m.chat !== 'status@broadcast') return
            if (typeof m.text !== 'string') m.text = ''
            if (opts['queque'] && m.text) {
                this.msgqueque.push(m.id || m.key.id)
                await delay(this.msgqueque.length * 1000)
            }
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!plugin.all) continue
                if (typeof plugin.all !== 'function') continue
                try {
                    await plugin.all.call(this, m, chatUpdate)
                } catch (e) {
                    if (typeof e === 'string') continue
                    console.error(e)
                }
            }
            if (m.isBaileys) return
            m.exp += Math.ceil(Math.random() * 10)

            let usedPrefix
            let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

            let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isOwner = isROwner || m.fromMe
            let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
            let participants = (m.isGroup ? groupMetadata.participants : []) || []
            let user = (m.isGroup ? participants.find(u => this.decodeJid(u.id) === m.sender) : {}) || {} // User Data
            let bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
            let isAdmin = user && user?.admin || false // Is User Admin?
            let isBotAdmin = bot && bot?.admin || false // Are you Admin?
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) {
                    // global.dfail('restrict', m, this)
                    continue
                }
                const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
                let match = (_prefix instanceof RegExp ? // RegExp Mode?
                    [[_prefix.exec(m.text), _prefix]] :
                    Array.isArray(_prefix) ? // Array?
                        _prefix.map(p => {
                            let re = p instanceof RegExp ? // RegExp in Array?
                                p :
                                new RegExp(str2Regex(p))
                            return [re.exec(m.text), re]
                        }) :
                        typeof _prefix === 'string' ? // String?
                            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                            [[[], new RegExp]]
                ).find(p => p[1])
                if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                })) continue
                if (typeof plugin !== 'function') continue
                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                    args = args || []
                    let _args = noPrefix.trim().split` `.slice(1)
                    let text = _args.join` `
                    command = (command || '').toLowerCase()
                    let fail = plugin.fail || global.dfail // When failed
                    let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                        plugin.command.test(command) :
                        Array.isArray(plugin.command) ? // Array?
                            plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                                cmd.test(command) :
                                cmd === command
                            ) :
                            typeof plugin.command === 'string' ? // String?
                                plugin.command === command :
                                false

                    if (!isAccept) continue
                    m.plugin = name
                    if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                        let chat = global.db.data.chats[m.chat]
                        let user = global.db.data.users[m.sender]
                        if (name != 'unbanchat.js' && chat && chat?.isBanned) return // Except this
                        if (name != 'unbanuser.js' && user && user?.banned) return
                    }
                    if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.rowner && !isROwner) { // Real Owner
                        fail('rowner', m, this)
                        continue
                    }
                    if (plugin.owner && !isOwner) { // Owner UserJid
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.mods && !isMods) { // Moderator
                        fail('mods', m, this)
                        continue
                    }
                    if (plugin.premium && !isPrems) { // Premium
                        fail('premium', m, this)
                        continue
                    }
                    if (plugin.group && !m.isGroup) { // Group Only
                        fail('group', m, this)
                        continue
                    } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                        fail('botAdmin', m, this)
                        continue
                    } else if (plugin.admin && !isAdmin) { // User Admin
                        fail('admin', m, this)
                        continue
                    }
                    if (plugin.private && m.isGroup) { // Private Chat Only
                        fail('private', m, this)
                        continue
                    }
                    if (plugin.register == true && _user.registered == false) { // Need register?
                        fail('unreg', m, this)
                        continue
                    }
                    m.isCommand = true
                    let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                    if (xp > 200) m.reply('Ngecit -_-') // Hehehe
                    else m.exp += xp
                    if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                        this.sendB(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy(number/angka)* or *${usedPrefix}buyall*\n\nJadilah user premium agar limit anda unlimited, jika berminat silahkan ketik *#uptoprem*`, wm, null, [[`Buy`, `#buy1`], [`Buyall`, `#buyall`], [`Up To Premium`, `#uptopremiu`]], m)
                        // this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, m)
                        continue // Limit habis
                    }
                    if (plugin.level > _user.level) {
                        this.sendB(m.chat, `Diperlukan level *${plugin.level}* untuk menggunakan perintah ini. Level kamu *${_user.level},* naikan Levelmu dengan mengetik *${usedPrefix}levelup* atau klik button di bawah!`, wm, null, [[`Levelup`, `#levelup`]], m)
                        // this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
                        continue // If the level has not been reached
                    }
                    let extra = {
                        match,
                        usedPrefix,
                        noPrefix,
                        _args,
                        args,
                        command,
                        text,
                        conn: this,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isOwner,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                    }
                    try {
                        await plugin.call(this, m, extra)
                        if (!isPrems) m.limit = m.limit || plugin.limit || false
                    } catch (e) {
                        // Error occured
                        m.error = e
                        console.error(e)
                        if (e) {
                            let text = util.format(e)
                            for (let key of Object.values(global.APIKeys))
                                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            m.reply(text, m.chat)
                        }
                    } finally {
                        // m.reply(util.format(_user))
                        if (typeof plugin.after === 'function') {
                            try {
                                await plugin.after.call(this, m, extra)
                            } catch (e) {
                                console.error(e)
                            }
                        }
                        if (m.limit) m.reply(+ m.limit + ' ' + 'Limit terpakai')
                    }
                    break
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            if (opts['typing']) conn.sendPresenceUpdate('composing', m.chat) 
            //console.log(global.db.data.users[m.sender])
            let user, stats = global.db.data.stats
            if (m) {
                if (m.sender && (user = global.db.data.users[m.sender])) {
                    user.exp += m.exp
                    user.limit -= m.limit * 1
                }

                let stat
                if (m.plugin) {
                    let now = + new Date
                    if (m.plugin in stats) {
                        stat = stats[m.plugin]
                        if (!isNumber(stat.total)) stat.total = 1
                        if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                        if (!isNumber(stat.last)) stat.last = now
                        if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                    } else stat = stats[m.plugin] = {
                        total: 1,
                        success: m.error != null ? 0 : 1,
                        last: now,
                        lastSuccess: m.error != null ? 0 : now
                    }
                    stat.total += 1
                    stat.last = now
                    if (m.error == null) {
                        stat.success += 1
                        stat.lastSuccess = now
                    }
                }
            }
            try {
                require('./lib/print')(m, this)
            } catch (e) {
                console.log(m, m.quoted, e)
            }
            if (opts['autoread']) await this.chatRead(m.chat, m.isGroup ? m.sender : undefined, m.id || m.key.id).catch(() => { })
            let quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (opts['queque'] && m.text && quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)
        }
    },

    async participantsUpdate({ id, participants, action }) {
        if (opts['self']) return
        // if (id in conn.chats) return // First login will spam
        if (global.isInit) return
        let chat = global.db.data.chats[id] || {}
        let text = ''
        switch (action) {
            case 'add':
            case 'remove':
                if (chat.welcome) {
                    let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
                    for (let user of participants) {
                        let pp = 'https://telegra.ph/file/118a75cb0c8396bdd7975.jpg'
                        try {
                            pp = await this.profilePictureUrl(user, 'image')
                        } catch (e) {

                        } finally {
                            text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc.toString()) :
                                (chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
                            this.sendBD(id, text, wm, pp, [[`Menu`, `.menu`], [action === 'add' ? 'Welcome 🙏' : 'Goodbye 👋', '@rasel.ganz']], {                      
                              key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${await this.getName(user)}`, vcard: `BEGIN: VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${user}\nitem1.TEL;waid=${user.split('@')[0]}:${user.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}},
                              { 
                               jpegThumbnail: await (await fetch("https://telegra.ph/file/27e90a619b30082694bde.jpg")).buffer(), fileName: action === 'add' ? `Welcome ${this.getName(user)} ` : `Goodbye ${this.getName(user)} `, mimetype: global.td, fileLength: global.fsdx, pageCount: global.pcdx,
                               mentions: [user],
                               contextInfo: {
                               externalAdReply :{
                                  mediaUrl: linkig,
                                  mediaType: 2,
                                  description: deslink, 
                                  title: titlink + 'ツ',
                                  body: bodlink,
                                  thumbnail: await(await fetch(pp)).buffer()
                              }}
                           })
                       }
                   }
               }
               break             
            case 'promote':
                text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
            case 'demote':
                if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
                text = text.replace('@user', '@' + participants[0].split('@')[0])
                if (chat.detect) this.sendMessage(id, text, {
                    contextInfo: {
                        mentionedJid: this.parseMention(text)
                    }
                })
                break
        }
    },
    async delete({ remoteJid, fromMe, id, participant }) {
        if (fromMe) return
        let chats = Object.entries(conn.chats).find(([user, data]) => data.messages && data.messages[id])
        if (!chats) return
        let msg = JSON.parse(chats[1].messages[id])
        let chat = global.db.data.chats[msg.key.remoteJid] || {}
        if (chat.delete) return
        let caption = `
Terdeteksi @${participant.split`@`[0]} telah menghapus pesan
Untuk mematikan fitur ini, ketik #enable delete
`
        this.sendB(msg.key.remoteJid, caption, wm, null, [[`Nyalakan Delete`, `.enable delete`]], 
            msg, 
            {
            mentions: [participant]
        })
        this.copyNForward(msg.key.remoteJid, msg).catch(e => console.log(e, msg))
    }
}

global.dfail = async (type, m, conn) => {
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
    let lang = db.data.users[m.sender].language 
    let msg = {
        rowner: `Perintah Ini Hanya Untuk @${global.owner[0]}`,
        owner: `Perintah Ini Hanya Untuk @${global.owner[0]}`,
        mods: `Perintah Ini Hanya Untuk Moderator`,
        moderator: `Perintah Ini Hanya Untuk Moderator`,
        prems: `Perintah Ini Hanya Untuk Pengguna Premium`,
        premium: `Perintah Ini Hanya Untuk Pengguna Premium`,
        group: `Perintah Ini Hanya Dapat Digunakan Di Dalam Grup`,
        private: `Perintah Ini Hanya Dapat Digunakan Di Chat Pribadi @${conn.user.jid.split('@')[0]}`,
        admin: `Perintah Ini Hanya Untuk Admin Grup`,
        botAdmin: `Perintah Ini Aktif Ketika Bot Menjadi Admin`,
        unreg: `Belum Terdaftar, Silahkan Daftar Dengan Mengetik #daftar nama.umur`,
        dewasa: `Fitur DEWASA Tidak Aktif Silahkan Hubungi Owner Untuk Mengaktifkannya`,
        nsfw: `Fitur NSFW Tidak Aktif Silahkan Hubungi Owner Untuk Mengaktifkannya`,
        game: `Fitur GAME Tidak Aktif Silahkan Hubungi Owner Untuk Mengaktifkannya`,
        rpg: `Fitur RPG Tidak Aktif Silahkan Hubungi Owner Untuk Mengaktifkannya`,
        restrict: `Fitur Admin Tidak Aktif Silahkan Hubungi Owner Untuk Mengaktifkannya`,
      }[type]
    if (msg) return conn.reply(m.chat,  msg, m, { mentions: conn.parseMention(msg), jpegThumbnail: await (await fetch(pp)).buffer() })
}

let fs = require('fs')
let chalk = require('chalk')
const { default: fetch } = require('node-fetch')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler())
})

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h + ' Hour ', m + ' Minute ', s + ' Second'].map(v => v.toString().padStart(2, 0)).join(' ')
    //return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.tmbnld = [
    'https://telegra.ph/file/27e90a619b30082694bde.jpg',
]

global.tmbnlm = [
    'https://telegra.ph/file/96bd6642bdf0c931d1146.jpg',
    'https://telegra.ph/file/fe2985e1f8d777a5f6e2e.jpg',
    'https://telegra.ph/file/42f43b3136cfcae01b519.jpg',
    'https://telegra.ph/file/e93c7ecd8959a698d7d45.jpg',
    'https://telegra.ph/file/aa032976a112101614930.jpg',
]

global.flaaa = [
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
]
