let bs = require('@bochilteam/scraper')

let handler = m => m
handler.before = async function(m, { match, usedPrefix, command, conn }) {
    let setting = global.db.data.settings[conn.user.jid]
    let user = global.db.data.users[m.sender]
    let chat = global.db.data.chats[m.chat]
    //====================================================================================================================//
   
    // auto update status
    if (setting.statusUpdate) {
        let _uptime = process.uptime() * 1000;
        let uptime = _uptime.toTimeString();
        conn.updateProfileStatus(`Uptime: ${uptime} | Mode: ${set.opts['self'] ? "Private" : "Publik"} | Database: ${Object.keys(db.data.users).length} user | Made with ♡ by ` + set.wm ).catch(_ => _);         
    } 
    // did you mean
    /* if ((usedPrefix = (match[0] || '')[0])) {
        try {
          let tek = m.text.toLowerCase().split(' ')
          let teks = tek[1] === usedPrefix ? tek[2] : tek[1]
          let noPrefix = (tek[0] === usedPrefix ? tek[1] : tek[0]).replace(usedPrefix, '')
          let help = Object.values(global.plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1).map(v => v.split` `[0])
          if (help.includes(noPrefix)) return
          let mean = await bs.didyoumean(noPrefix, help, { threshold: 0.6 }) // default 0.7
          let hasil = mean[0]?.query
          if (!hasil) return
          let akurasi = mean[0]?.score * 100
          let caption = `Hai @${parseInt(m.sender)} 👋\nCommand *${noPrefix}* tidak terdaftar di dalam *menu* apakah yang kamu maksud command ini?\n\n*${usedPrefix + hasil}* ( ${akurasi.toFixed(1)}% )`
          conn.sendButton(m.chat, caption, set.wm, null, [['Yes', usedPrefix + hasil + ' ' + teks], ['No', usedPrefix + 'menu']], m, { mentions: [m.sender] })                        
        } catch {
          // console.log('Did you mean tidak bekerja') //(e)
        }
    } */
    // auto get message 
    if (setting.autoMessage) {
        if (m.isBaileys || m.key.remoteJid.endsWith('status@broadcast')) return
        if (chat.isBanned) return
        if (user.banned) return
        let msgs = global.db.data.msgs
        if (!(m.text.toLowerCase() in msgs)) return
        let _m = this.serializeM(JSON.parse(JSON.stringify(msgs[m.text.toLowerCase()]), (_, v) => {
        if (
            v !== null &&
            typeof v === 'object' &&
            'type' in v &&
            v.type === 'Buffer' &&
            'data' in v &&
            Array.isArray(v.data)) {
              return Buffer.from(v.data)
            }
            return v
        }))
        _m.copyNForward(m.chat)
    }
    //=====================================================================================================================//
}
handler.exp = 0
module.exports = handler
