const { performance } = require('perf_hooks')
const simple = require('./lib/simple')
const util = require('util')
const fs = require('fs')
const fetch = require('node-fetch')
const chalk = require('chalk')
const moment = require('moment-timezone')
const tr = require('translate-google-api')
const tr2 = require('translate-google')
const isNumber = x => typeof x === 'number' && !isNaN(x)
const readMore = String.fromCharCode(8206).repeat(4001)

module.exports = {
    async handler(chatUpdate) {
        if (global.db.data == null) await global.loadDatabase()
        this.msgqueque = this.msgqueque || []
        if (!chatUpdate) return
        if (chatUpdate.messages.length > 1) console.log(chatUpdate.messages)
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        if (!m) return
        const Tnow = (new Date()/1000).toFixed(0)
        const sel = Tnow - m.messageTimestamp
        if (sel > global.Intervalmsg) return console.log(new ReferenceError(`Pesan ${Intervalmsg} detik yang lalu diabaikan agar tidak spam`))
        try {
            m = simple.smsg(this, m) || m
            if (!m) return
            m.exp = 0
            m.limit = false
            try {
                let user = global.db.data.users[m.sender]
                if (typeof user !== 'object') global.db.data.users[m.sender] = {}
                if (user) {
                    if (!isNumber(user.joincount)) user.joincount = 1
                    if (!isNumber(user.healt)) user.healt = 0
                    if (!isNumber(user.level)) user.level = 1
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.skata)) user.skata = 0
                    if (!isNumber(user.limit)) user.limit = 10
                    if (!isNumber(user.lastseen)) user.lastseen = 0
                    if (!isNumber(user.usebot)) user.usebot = 0
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (!isNumber(user.lastclaim2)) user.lastclaim2 = 0  
                    if (!isNumber(user.lastngojek)) user.lastngojek = 0
                    if (!isNumber(user.lastnebang)) user.lastnebang = 0
                    if (!isNumber(user.lastnyampah)) user.lastnyampah = 0
                    if (!isNumber(user.lastowner)) user.lastowner = 0
                    if (!isNumber(user.money)) user.money = 0
                    if (!isNumber(user.diamond)) user.diamond = 0
                    if (!isNumber(user.iron)) user.iron = 0
                    if (!isNumber(user.batu)) user.batu = 0
                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!isNumber(user.string)) user.string = 0  
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
                    if (!isNumber(user.area)) user.area = 0
                    if (!('banned' in user)) user.banned = false
                    if (!isNumber(user.warn)) user.warn = 0
                    if (!isNumber(user.warning)) user.warning = 0
                    if (!isNumber(user.lastIstigfar)) user.lastIstigfar = 0
                    if (!isNumber(user.call)) user.call = 0  

                    if (!isNumber(user.afk)) user.afk = -1
                    if (!('afkReason' in user)) user.afkReason = ''
                    if (!('pasangan' in user)) user.pasangan = ''
                    // RPG
                    if (!isNumber(user.anakkucing)) user.anakkucing = 0
                    if (!isNumber(user.anakkuda)) user.anakkuda = 0
                    if (!isNumber(user.anakrubah)) user.anakrubah = 0
                    if (!isNumber(user.anakanjing)) user.anakanjing = 0
                    if (!isNumber(user.makananpet)) user.makananpet = 0
                    if (!isNumber(user.antispam)) user.antispam = 0
                    if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0
                    if (!isNumber(user.sword)) user.sword = 0
                    if (!isNumber(user.sworddurability)) user.sworddurability = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0
                    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                    if (!isNumber(user.fishingrod)) user.fishingrod = 0
                    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
                    if (!isNumber(user.lastadventure)) user.lastadventure = 0
                    if (!isNumber(user.lastfishing)) user.lastfishing = 0
                    if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
                    if (!isNumber(user.lastduel)) user.lastduel = 0
                    if (!isNumber(user.lastmining)) user.lastmining = 0
                    if (!isNumber(user.lasthunt)) user.lasthunt = 0
                    if (!isNumber(user.lastweekly)) user.lastweekly = 0
                    if (!isNumber(user.lastmonthly)) user.lastmontly = 0  
                    if (!('registered' in user)) user.registered = false
                    if (!user.registered) {
                    if (!('name' in user)) user.name = this.getName(m.sender)
                    if (!('email' in user)) user.email = ''
                    if (!('label' in user)) user.label = ''
                    if (!isNumber(user.age)) user.age = -1
                    if (!isNumber(user.regTime)) user.regTime = -1
                    }
                    if (!('premium' in user)) user.premium = false
                    if (!isNumber(user.premiumTime)) user.premiumTime = 0
                    if (!user.role) user.role = ''
                    if (!('autolevelup' in user)) user.autolevelup = false
                    if (!isNumber(user.pc)) user.pc = 0
                    //mancing
                    if (!isNumber(user.as)) user.as = 0
                    if (!isNumber(user.paus)) user.paus = 0
                    if (!isNumber(user.kepiting)) user.kepiting = 0
                    if (!isNumber(user.gurita)) user.gurita = 0
                    if (!isNumber(user.cumi)) user.cumi= 0
                    if (!isNumber(user.buntal)) user.buntal = 0
                    if (!isNumber(user.dory)) user.dory = 0
                    if (!isNumber(user.lumba)) user.lumba = 0
                    if (!isNumber(user.lobster)) user.lobster = 0
                    if (!isNumber(user.hiu)) user.hiu = 0
                    if (!isNumber(user.udang)) user.udang = 0
                    if (!isNumber(user.ikan)) user.ikan = 0
                    if (!isNumber(user.orca)) user.orca = 0
                    // kerja
                    if (!isNumber(user.atm)) user.atm = 0
                    if (!('job' in user)) user.job = 'Pengangguran'
                    if (!isNumber(user.lastjob)) user.lastjob = 0
                    if (!isNumber(user.lastkerja)) user.lastkerja = 0
                    if (!('ojek' in user)) user.ojek = false
                    if (!('pedagang' in user)) user.pedagang = false
                    if (!('dokter' in user)) user.dokter = false
                    if (!('petani' in user)) user.petani = false
                    if (!('montir' in user)) user.montir = false
                    if (!('kuli' in user)) user.kuli = false
                    if (!('polisi' in user)) user.polisi = false
                } else global.db.data.users[m.sender] = {
                    joincount: 1,
                    healt: 100,
                    level: 1,
                    exp: 0,
                    skata: 0,
                    limit: 10,
                    lastseen: 0,
                    usebot: 0,
                    lastclaim: 0,
                    lastclaim2: 0,
                    lastngojek: 0,
                    lastnebang: 0,
                    lastnyampah: 0,
                    lastowner: 0,
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
                    kucinglastclaim: 0,
                    kuda: 0,
                    kudalastclaim: 0,
                    rubah: 0,
                    rubahlastclaim: 0,
                    anjing: 0,
                    anjinglastclaim: 0,
                    area: 0,
                    banned: false,
                    warn: 0,
                    warning: 0,
                    lastIstigfar: 0,
                    call: 0,
                    afk: -1,
                    afkReason: '',
                    pasangan: '',
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
                    name: this.getName(m.sender),
                    email: '',
                    label: '',
                    age: -1,
                    regTime: -1,
                    premium: false,
                    premiumTime: 0,
                    role: '',
                    autolevelup: false,
                    pc: 0,
                    // Mancing cuk
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
                    // Kerja Woy
                    atm: 0,
                    job: 'Pengangguran',
                    lastjob: 0,
                    lastkerja: 0,
                    ojek: false,
                    pedagang: false,
                    dokter: false,
                    petani: false,
                    montir: false,
                    kuli: false,
                    polisi: false,
                }
                let chat = global.db.data.chats[m.chat]
                if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
                if (chat) {
                    if (!('name' in chat)) chat.name = await this.getName(m.chat)
                    if (!('only' in chat)) chat.only = false
                    if (!('closeGroup' in chat)) chat.closeGroup = false
                    if (!('openGroup' in chat)) chat.openGroup = false
                    if (!('isBanned' in chat)) chat.isBanned = false
                    if (!('welcome' in chat)) chat.welcome = true
                    if (!('detect' in chat)) chat.detect = true
                    if (!('sWelcome' in chat)) chat.sWelcome = ''
                    if (!('sBye' in chat)) chat.sBye = ''
                    if (!('sPromote' in chat)) chat.sPromote = ''
                    if (!('sDemote' in chat)) chat.sDemote = ''
                    if (!('stiker' in chat)) chat.stiker = false
                    if (!('delete' in chat)) chat.delete = false
                    if (!('antidelete' in chat)) chat.antidelete = true
                    if (!('antiLink' in chat)) chat.antiLink = true
                    if (!('antiBadword' in chat)) chat.antiBadword = true
                    if (!('antispam' in chat)) chat.antispam = true
                    if (!('antivirus' in chat)) chat.antitroli = false
                    if (!('viewonce' in chat)) chat.viewonce = true
                    if (!('nsfw' in chat)) chat.nsfw = false
                    if (!('mature' in chat)) chat.mature = false
                    if (!('rpg' in chat)) chat.rpg = false
                    if (!('game' in chat)) chat.game = true
                    if (!('simi' in chat)) chat.simi = true
                    if (!('clear' in chat)) chat.clear = false
                    if (!isNumber(chat.cleartime)) chat.clearTime = 0 
                    if (!isNumber(chat.closeTime)) chat.closeTime = 00
                    if (!isNumber(chat.openTime)) chat.openTime = 06
                    if (!isNumber(chat.admin)) chat.admin = 0
                    if (!isNumber(chat.expired)) chat.expired = 0
                    if (!isNumber(chat.onlyNumber)) chat.onlyNumber = 62
                } else global.db.data.chats[m.chat] = {
                    name: await this.getName(m.chat),
                    only: false,
                    closeGroup: false,
                    openGroup: false,
                    isBanned: false,
                    welcome: true,
                    detect: true,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '',
                    sDemote: '',
                    stiker: false,
                    delete: false,
                    antidelete: true,
                    antiLink: true,
                    antiBadword: true,
                    antispam: true,
                    antivirus: false,
                    viewonce: true,
                    nsfw: false,
                    mature: false,
                    rpg: true,
                    game: true,
                    simi: false,
                    clear: false,
                    closeTime: 00,
                    openTime: 06,
                    clearTime: 0,
                    expired: 0,
                    onlyNumber: 62
                }
                let settings = global.db.data.settings[this.user.jid]
                if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
                if (settings) {
                    if (!'anonymous' in settings) settings.anonymous = true
                    if (!'autoread' in settings) settings.autoread = false
                    if (!'autoreadsw' in settings) settings.autoreadsw = false
                    if (!'autotyping' in settings) settings.autotyping = false
                    if (!'anticall' in settings) settings.anticall = false
                    if (!'antispam' in settings) settings.antispam = true
                    if (!'backup' in settings) settings.backup = false
                    if (!'autocleartmp' in settings) settings.autocleartmp = true
                    if (!'autodownload' in settings) settings.autodownload = true
                    if (!'developerMode' in settings) settings.developerMode = true
                    if (!'delete' in settings) settings.delete = false
                    if (!'antidelete' in settings) settings.antidelete = true
                    if (!'jadibot' in settings) settings.jadibot = false
                    if (!'lastseen' in settings) settings.lastseen = false
                    if (!'nsfw' in settings) settings.nsfw = true
                    if (!'mature' in settings) settings.mature = true
                    if (!'statusUpdate' in settings) settings.statusUpdate = false
                    if (!'antivirus' in settings) settings.antivirus = true
                    if (!'publicjoin' in settings) settings.publicjoin = true
                    if (!'game' in settings) settings.game = true
                    if (!'rpg' in settings) settings.game = true
                    if (!'getmsg' in settings) settings.getmsg = true
                 } else global.db.data.settings[this.user.jid] = {
                    anonymous: true,
                    autoread: false, 
                    autoreadsw: false, 
                    autotyping: false, 
                    anticall: false,
                    antispam: true,
                    backup: true,
                    autocleartmp: true, 
                    autodownload: true, 
                    developerMode: true, 
                    delete: false,
                    antidelete: true,
                    jadibot: false,
                    lastseen: false,
                    nsfw: true,
                    mature: true,
                    statusUpdate: false,
                    antivirus: true,
                    publicjoin: true,
                    game: true, 
                    rpg: true, 
                    getmsg: true,
                }
            } catch (e) {
                console.error(e)
            }
            
            const isROwner = [this.user.jid, ...set.owner.map(([number]) => number)].map(v => v?.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)      
            if (set.opts['nyimak']) return
            if (set.opts['self'] && !isROwner) return
            if (set.opts['pconly'] && !m.chat.endsWith('s.whatsapp.net')) return
            if (set.opts['gconly'] && !m.chat.endsWith('g.us')) return
            if (set.opts['swonly'] && m.chat !== 'status@broadcast') return
            if (typeof m.text !== 'string') m.text = ''
            if (set.opts['queque'] && m.text) {
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

            let isOwner = isROwner || m.fromMe
            let isMods = isOwner || set.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isPrems = isROwner || set.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let groupMetadata = (m.isGroup ? ((this.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
            let ownerGroup = (m.isGroup ? groupMetadata.owner : []) || []
            let participants = (m.isGroup ? groupMetadata.participants : []) || []
	    let user = (m.isGroup ? participants.find(u => this.decodeJid(u.id) === m.sender) : {}) || {} // User Data
            let bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
	    let isRAdmin = user && user?.admin == 'superadmin' || false // Is User Super Admin?
            let isAdmin = user && user?.admin == 'admin' || false // Is User Admin?
            let isBotAdmin = bot && bot?.admin || false // Are you Admin?

            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
               /*  if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) {
                    // global.dfail('restrict', m, this)
                    continue
                } */
                const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : set.prefix
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
                const expiration = m.msg?.contextInfo?.expiration
                if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    ownerGroup,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    expiration
                })) continue
                if (typeof plugin !== 'function') continue
                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                    args = args || []
                    let _args = noPrefix.trim().split` `.slice(1)
                    let text = _args.join` `
                    command = (command || '').toLowerCase()
                    let fail = plugin.fail || set.dfail // When failed
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
                        if (!['owner-unban.js', 'group-unban.js', 'info-listban.js', 'info-creator.js'].includes(name) && chat && chat?.isBanned && !isPrems) return // Kecuali ini, bisa digunakan
                        if (!['owner-unban.js', 'group-unban.js', 'info-listban.js', 'info-creator.js'].includes(name) && user && user?.banned) return
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
                    } else if (plugin.admin && !isAdmin && isROwner) { // User Admin
                        fail('admin', m, this)
                        continue
                    }
                    if (plugin.restrict && !m.fromOwner && !opts['restrict']) { // Restrict
                        fail('restrict', m, this)
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
                    if (plugin.desc && text.includes('-h')) { //Plugin description 
                        m.reply(plugin.desc.toString())
                        continue 
                    } 
                    let rpgmod = m.isGroup ? db.data.chats[m.chat].rpg : db.data.settings[this.user.jid].rpg
                    if (plugin.rpg && !rpgmod) { // RPG mode
                        fail('rpg', m, this)
                        continue
                    }
                    let gamemod = m.isGroup ? db.data.chats[m.chat].game : db.data.settings[this.user.jid].game
                    if (plugin.game && !gamemod) { // NSFW mode
                        fail('game', m, this)
                        continue
                    }
                    let nsfwmod = m.isGroup ? db.data.chats[m.chat].nsfw : db.data.settings[this.user.jid].nsfw
                    if (plugin.nsfw && !nsfwmod) { // NSFW mode
                        fail('nsfw', m, this)
                        continue
                    }
                    let maturemod = m.isGroup ? db.data.chats[m.chat].mature : db.data.settings[this.user.jid].mature
                    if (plugin.mature && !maturemod) { // Mature mode
                        fail('mature', m, this)
                        continue
                    }
                    let downmod = m.isGroup ? db.data.chats[m.chat].download : db.data.settings[this.user.jid].download 
                    if (plugin.download && !downmod) { // Download mode
                        fail('download', m, this)
                        continue
                    }
                    m.isCommand = true
                    let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                    if (xp > 200) m.reply('Ngecit -_-') // Hehehe
                    else m.exp += xp
                    if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                        this.sendButton(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, wm, 0, [['Buy', '.buy1']], m)
                        // this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, m)
                        continue // Limit habis
                    }
                    if (plugin.level > _user.level) {
                        this.sendButton(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, wm, 0, [['Levelup', '.levelup']], m)
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
                        ownerGroup,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isRAdmin,
                        isOwner,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                        expiration
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
                            for (let key of Object.values(set.api.key.s))
                                 text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            if (e.name) {
                                let devmode = db.data.settings[this.user.jid].developerMode
                                let tekk = `*ERROR!*\n\nPesan : ${m.text}\n\n\n\n*Plugin:* ${m.plugin}\n*Sender:* @${m.sender.split`@`[0]}\n*Chat:* ${m.chat}\n*Chat Name:* ${await this.getName(m.chat)}\n*Command:* ${usedPrefix + command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``
                                if (devmode) return this.reply(set.owner[0][0] + '@s.whatsapp.net', tekk, m, { mentions: this.parseMention(tekk) })
                                   .then(_=> m.react('❌') )
                                else return this.reply(m.chat, text, m)
                            }
                            /* let tek = text.split('\n\n')
			    let teknya = tek[0]
			    let footnya = tek[1] == '' ? tek[2] : tek[1] ? tek[1] : '' */
                            m.react('❌')
                            .then(_=> this.sendHydrated(m.chat, text, set.wm, null, null, null, 'https://www.whatsapp.com/otp/copy/' + usedPrefix  + command, 'Copy Command', [[]])
                            )            
                        }
                    } finally {
                        if (typeof plugin.after === 'function') {
                            try {
                                await plugin.after.call(this, m, extra)
                            } catch (e) {
                                console.error(e)
                            }
                        }
                        // if (m.limit) m.reply(+ m.limit + ' Limit terpakai')
                        //jika risih matiin aja 
                    }
                    break
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
		
            // conn.sendPresenceUpdate('composing', m.chat) 
            
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
            let quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (set.opts['queque'] && m.text && quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)           
        }
    },

    async participantsUpdate(update) {
        // console.log(update)
        let { id, participants, action } = update
        if (set.opts['self']) return
        if (this.isInit) return
        if (global.db.data == null) await global.loadDatabase()
        let chat = db.data.chats[id]
        let ppimut = 'https://telegra.ph/file/118a75cb0c8396bdd7975.jpg'
        let ppgc = 'https://telegra.ph/file/45315c8cc2cceb27ab81b.png'
        let text = ''
        switch (action) {
           case 'add':
           case 'remove':
             if (chat.welcome) {
                const groupMetadata = await this.groupMetadata(id)
                for (let user of participants) { 
                    let name = this.getName(user)
                    let pp = await this.profilePictureUrl(id, 'image').catch(_=> ppgc)
                    text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.sWelcome || 'Hi, @user 👋\nWelcom in group').replace('@subject', groupMetadata.subject).replace('@desc', groupMetadata.desc?.toString() || '') :
                           (chat.sBye || this.bye || conn.sBye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
                    if (action === 'add') {
                        if (user.includes(this.user.jid)) return this.reply(id, `Hello everyone 👋\n\nSaya adalah *${this.user.name}* Bot WhatsApp yang akan membantu kamu mempermudah sesuatu seperti membuat stiker dan lainnya, untuk menggunakan fitur bot silahkan ketik *#menu*`,                 
                            fake.contact(parseInt(user), name), { 
			    ephemeralExpiration: 86400,
                            contextInfo: {
                               mentionedJid: groupMetadata.participants.map(v => v.id),
                               externalAdReply :{
                                  showAdAttribution: true,
                                  mediaType: 1,
                                  title: set.wm, 
                                  thumbnail: await this.getBuffer(pp),
                                  renderLargerThumbnail: true,
                                  sourceUrl: 'https://chat.whatsapp.com/CUCsW6BWfmJLJwJgPQIaKM'
                               }
                            }
                        })                       
			if (db.data.chats[id].only) {
                            if (!user.startsWith(db.data.chats[id].onlyNumber)) return this.reply(id, `Sorry @${parseInt(user)} this group is only for people *+${db.data.chats[id].onlyNumber}* you will be removed from this group.\n\n                *Goodbye! 👋*\n`, null, { mentions: [user] })
                                .then(async _=> {
                                    await this.groupParticipantsUpdate(id, [user], "remove")
                                })
                        }
                      }
                      this.reply(id, text, fake.contact(parseInt(user), name), {
                         ephemeralExpiration: 86400,
                         contextInfo: {
                           mentionedJid: [user],
                           externalAdReply :{
                             showAdAttribution: true,
                             mediaType: 1,
                             title: set.wm, 
                             thumbnail: await this.getBuffer(pp),
                             renderLargerThumbnail: true,
                             sourceUrl: 'https://chat.whatsapp.com/CUCsW6BWfmJLJwJgPQIaKM'
                           }
                       }
                    }) 
                 }
             }
             break
           case 'promote':
           case 'demote':
             for (let user of participants) {
                text = (chat.sPromote || this.sPromote || conn.sPromote || '@user ```is now Admin```')          
                if (!text) text = (chat.sDemote || this.sDemote || conn.sDemote || '@user ```is no longer Admin```')
                text = text.replace('@user', '@' + participants[0].split('@')[0])
                if (chat.detect) {
                   let ucap = action === 'promote' ? participants[0] === this.user.jid ? 'Gk sia" jadi bot naik jabatan juga di grup wkwk' : 'Uhm...\nada yg naik jabatan nih' : 'Awikwok ada yg turun tahta:V'
                   let pp = await this.profilePictureUrl(participants[0], 'image').catch(_=> ppgc)
                   this.reply(id, text, fake.text(ucap), { mentions: [user] })
               } else this.teply(id, action === 'promote' ? 'Uhm...' : 'wkwk', fake.text(action === 'promote' ? 'Uhm bau" ada yg naik jabatan nih': 'Ada yg turun tahta:v'))
             }
	    break
        }
    },
    async groupsUpdate(update) {
        // console.log(update)
        if (set.opts['self']) return
        if (this.isInit) return
        for (let groupUpdate of update) {
            let id = groupUpdate.id
            if (!id) continue
            let chats = db.data.chats[id], text = ''
            let hid = await this.groupMetadata(id)
            let member = hid.participants.map(v => v.id)
            if (!chats.detect) continue
            if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
            if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
            if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
            if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
            if (groupUpdate.announce == true) text = (chats.sAnnounceOn || this.sAnnounceOn || conn.sAnnounceOn || '```Group has been closed!```')
            if (groupUpdate.announce == false) text = (chats.sAnnounceOff || this.sAnnounceOff || conn.sAnnounceOff || '```Group has been open!```')
            if (groupUpdate.restrict == true) text = (chats.sRestrictOn || this.sRestrictOn || conn.sRestrictOn || '```Group has been only admin!```')
            if (groupUpdate.restrict == false) text = (chats.sRestrictOff || this.sRestrictOff || conn.sRestrictOff || '```Group has been all participants!```')
            if (!text) continue
            this.sendHydrated(id, "\n               *「 DETECTION 」*\n\n" + text, set.wm, set.fla + 'detection', 0, 0, 'https://www.whatsapp.com/otp/copy/bit.ly/bit.ly/AcellComel', 'Tutorial Prank Orang 😎', [[]], null, { asLocation: true, mentions: member })
        }
    },
	
    async delete(update) {
        try {
          // console.log(update)
          let { remoteJid, fromMe, id, participant } = update
          if (set.opts['self'] && fromMe) return
          if (this.isInit) return
          if (db.data == null) await global.loadDatabase()
          let chats = Object.entries(await this.chats).find(([user, data]) => data.messages && data.messages[id])
          if (!chats) return
          let msg = JSON.parse(JSON.stringify(chats[1].messages[id]))
          let chat = global.db.data.chats[remoteJid]
          let nama = pickRandom(['apaan', 'galiat', 'hehe', 'hihi', 'hm', 'kyubi', 'makan', 'mana', 'seduh', 'smile', 'xixi'])
          let stiker = fs.readFileSync('./api/sticker/' + nama + '.webp')
          if (!chat.antidelete) return this.sendFile(remoteJid, stiker, 'delete.webp', '', msg)			
          this.sendFile(remoteJid, stiker, 'hayo.webp', '', msg).then(_=> this.copyNForward(remoteJid, msg).catch(e => console.log(e, msg)))
        } catch { 
	}
    },
    
    async onCall(json) {
	console.log(json.content[0])
        if (set.opts['self']) return 
        if (this.isInit) return
        if (global.db.data == null) await global.loadDatabase() 
        if (!glonal.db.data.settings[this.user.jid].anticall) return
	let [data] = json
        let { from, isGroup, isVideo, date, status} = data
        if (isGroup) return
        if (json.content[0].tag == 'offer') { 
           let typeCall = json.content[0].content[0].tag
           let callerId = json.content[0].attrs['call-creator']
           let user = db.data.users[callerId]
           if (user.whitelist) return
           switch (this.callWhitelistMode) {
                case 'mycontact':
                if (callerId in this.contacts && 'short' in this.contacts[callerId]) return
                break
           }
           let kontakk = [
             [
               `${set.owner[0][0]}`, 
               `${this.getName(set.owner[0][0] + '@s.whatsapp.net')}`,
               `👑 Developer Bot `,
               `🚫 Don't call me 🥺`, 
               `Not yet`,
               `🇮🇩 Indonesia`,
               `Mampus kena block makanya jangan asal nelpon" 🗿`,
               `Folllow ig @rasel.ganz for open blocked`
             ], 
             [
               `0`, 
               `${this.getName('0@s.whatsapp.net')}`,
               `🔥 Suhu 🔥`,
               `Kang banned bot ilegal 😎`,
               `whatsapp@gmail.com`,
               `Cari sendiri`, 
               `https://whatsapp.com`,
               `Empat sehat le mark sempurna 👌🗿`
             ]
           ]
           user.call += 1
           if (user.call == 5) {
              let sentMsg = await this.sendContactArray(callerId, kontakk)
              this.reply(callerId, `Sistem auto block, jangan menelepon bot silahkan hubungi owner untuk dibuka!`, sentMsg).then(_=> {
              this.updateBlockStatus(callerId, 'block')})
              .then(_=> { 
                user.call = 0
	      }).then(_=> {
                this.reply(owner[0][0] + '@s.whatsapp.net', `*NOTIF CALLER BOT!*\n\n@${callerId.split`@`[0]} telah menelpon *${this.user.name}*\n\n ${callerId.split`@`[0]}\n`, null, { mentions: [callerId] })
              })
           } else this.sendHydrated(callerId, `Maaf tidak bisa menerima panggilan, Jika kamu menelepon lebih dari 5, kamu akan diblokir.\n\n${user.call} / 5`, wm, fla + "don't call", null, null, null, null, [[null, null]], null, { asLocation: true })
        }
    }
}

global.set.dfail = async (type, m, conn) => {
    let msg = {
        rowner: `Perintah Ini Hanya Untuk @${set.owner[0][0]}`,
        owner: `Perintah Ini Hanya Untuk @${set.owner[0][0]}`,
        mods: `Perintah Ini Hanya Untuk *Moderator*`,
        moderator: `Perintah Ini Hanya Untuk *Moderator*`,
        prems: `Perintah Ini Hanya Untuk Pengguna *Premium*`,
        premium: `Perintah Ini Hanya Untuk Pengguna *Premium*`,
        group: `Perintah Ini Hanya Dapat Digunakan Di Dalam *Grup*`,
        private: `Perintah Ini Hanya Dapat Digunakan Di *Chat Pribadi* @${conn.user.jid.split('@')[0]}`,
        admin: `Perintah Ini Hanya Untuk *Admin* Grup`,
        botAdmin: `Perintah Ini Aktif Ketika *Bot* Menjadi *Admin*`,
        mature: `Fitur *DEWASA* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        nsfw: `Fitur *NSFW* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        game: `Fitur *GAME* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        rpg: `Fitur *RPG* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        download: `Fitur *Downloader* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        restrict: `Fitur *Admin* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
    }[type]
    if (msg) return conn.sendButton(m.chat, "\n*───「 ACCESS DENIED 」───*\n\n" + msg, set.wm, set.fla + "access denied", [['Menu', '.menu']], m, { asLocation: true, mentions: conn.parseMention(msg) })
    let unreg = { 
        unreg: `Belum *Terdaftar,* Silahkan Daftar Dengan Mengetik *#daftar nama.umur*\n\nContoh: *#daftar ${m.name}.17*`
    }[type]
    if (unreg) return conn.sendButton(m.chat, "\n*───「 ACCESS DENIED 」───*\n\n" + unreg, set.wm, set.fla + "Please Register", [['Register', `.register ${m.name}`]], m, { asLocation: true, mentions: conn.parseMention(msg) })
}

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
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

async function translate(text, from, to) {
   return await tr(text, { from: from, to: to }).catch(async _=> [await tr2(text, { from: from, to: to })] ) 
}
