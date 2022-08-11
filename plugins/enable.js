let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let chat = db.data.chats[m.chat]
    let user = db.data.users[m.sender]
    let setting = db.data.settings[conn.user.jid] 
    let type = (args[0] || '').toLowerCase()
    let isAll = false
    let isUser = false
    switch (type) {
        case 'w':
        case 'wel':
        case 'welcome':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.welcome = isEnable
        break
        case 'detek':
        case 'detect':
        case 'deteksi':
        case 'detection':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.detect = isEnable
        break
        case 'pclink':
        case 'privatelink':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.privatelink = isEnable
        break
        case 'desc':
        case 'desk':
        case 'deskripsi':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.descUpdate = isEnable
        break
        case 'd':
        case 'del':
        case 'delete':
        if (!m.isGroup) {
          isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        if (m.isGroup) chat.delete = isEnable
        else setting.delete = isEnable
        break
        case 'antid':
        case 'antidel':
        case 'antidelete':
        if (!m.isGroup) {
          isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.antidelete = isEnable
        break
        case 'vo':
        case 'viewonce':
        case 'antiviewonce':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.antiviewonce = isEnable
        break
        case 'autodelvn':
        case 'delvn':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.autodelvn = isEnable
        break
        case 'antivirus':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        setting.antivirus = isEnable
        break
        case 'document':
        case 'doc':
        case 'dokumen':
        case 'dok':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.asDocument = isEnable
        break
        case 'publik':
        case 'public':
        case 'p':
        isAll = true
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
        global.opts['self'] = !isEnable
        break
        case 'publicjoin':
        case 'publikjoin':
        case 'join':
        isAll = true
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
        setting.publicjoin = isEnable
        break
        case 'antilink':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.antiLink = isEnable
        break
        case 'antiluar':
        case 'only':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.only = isEnable
        break
        case 's':
        case 'stick':
        case 'stiker':
        case 'sticker':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
           global.dfail('admin', m, conn)
           throw false
          }
        }
        chat.stiker = isEnable
        break
        case 'autolevelup':
        case 'levelup':
        case 'level':
        isUser = true
        user.autolevelup = isEnable
        break
        case 'mycontact':
        case 'mycontacts':
        case 'whitelistcontact':
        case 'whitelistcontacts':
        case 'whitelistmycontact':
        case 'whitelistmycontacts':
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.callWhitelistMode = isEnable
        break
        case 'gc':
        case 'gconly':
        case 'grup':
        case 'group':
        case 'gruponly':
        case 'grouponly':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        global.opts['gconly'] = isEnable
        global.opts['pconly'] = false 
        break
        case 'pc':
        case 'pconly':
        case 'private':
        case 'privat':
        case 'privatonly':
        case 'privateonly':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        global.opts['pconly'] = isEnable
        global.opts['gconly'] = false
        break
        case 'backup':
        case 'backupdb':
        case 'autobackup':
        case 'autobackupdb':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.backup = isEnable
        break
        case 'anticall':
        case 'antivc':
        case 'antitelfon':
        case 'antitelpon':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.anticall = isEnable
        break 
        case 'developer': 
        case 'devmode':
        case 'dev':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.developerMode = isEnable
        break
        case 'autoread':
        case 'read':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.autoread = isEnable
        break
        case 'autoreadsw':
        case 'readsw':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.autoreadsw = isEnable	    
        break
        case 'restrict':
        case 'rest':
        case 'res':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        opts['restrict'] = isEnable
        break
        case 'ketik':
        case 'mengetik':
        case 'autotyping':
        case 'typing':
        case 'type':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.autotyping = isEnable
        break
        case 'antispam':
        case 'nospam':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.antispam = isEnable
        break
        case 'autogetmsg': 
        case 'getmsg':
        if (!m.isGroup) {
          isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        if (m.isGroup) chat.getmsg = isEnable
        else setting.getmsg = isEnable
        break
        case 'status': 
        case 'updatestatus':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
        }
        setting.statusUpdate = isEnable
        break
        case 'antivirus':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
        }
        setting.antivirus = isEnable
        break
        case 'anon':
        case 'anonymous':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.anon = isEnable
        break
        case 'nsfw':
        if (!m.isGroup) {
          isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        if (m.isGroup) chat.nsfw = isEnable
        else setting.nsfw = isEnable
        break
        case 'dewasa':
        case 'mature':
        if (!m.isGroup) {
            isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        if (m.isGroup) chat.mature = isEnable
        else setting.mature = isEnable
        break
        case 'game':
        if (!m.isGroup) {
            isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        if (m.isGroup) chat.game = isEnable
        else setting.game = isEnable
        break
        case 'rpg':
        if (!m.isGroup) {
            isAll = true
          if (!isOwner) {
            global.dfail('owner', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        if (m.isGroup) chat.rpg = isEnable
        else setting.rpg = isEnable
        break
        case 'jadibot':
        case 'bot':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.jadibot = isEnable
        break
        case 'sim':
        case 'simi':
        case 'simih':
        if (!m.isGroup) isAll = true
          if (m.isGroup) {
            if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
            }
        }
        chat.simi = isEnable
        break
        case 'antitoxic':
        case 'antibadword':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
             global.dfail('admin', m, conn)
             throw false
          }
        }
        chat.antiBadword = isEnable  
        break
        case 'autodownload':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.autodownload = isEnable
        break 
        case 'clear':
        case 'autoclear':
        case 'autoclearchat':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.autoclear = isEnable 
        break
        case 'cleartmp':
        case 'autocleartmp':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.autocleartmp= isEnable
        break
        case 'last':
        case 'lastseen':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.lastseen = isEnable
        conn.sendPresenceUpdate(isEnable ? 'available' : 'unavailable')
        break
        default:
        let ow = `Public
Restrict
Lastseen
Anonymous
Autoread 
Autoreadsw
Autotyping
Autolevelup  
Autocleartmp 
Autobackup
Antispam
Anticall
Antilink 
Antiluar
Antivirus
Antitoxic 
Antidelete
Delete
Publicjoin
Welcome
Bye
Document
Detection 
Getmsg
Game
Rpg
Sticker 
Simi
Grouponly
Privateonly
Privatelink
Updatestatus
Jadibot  
Mycontact`
       let ad = `Autolevelup 
Antiluar
Antilink 
Antivirus 
Antidelete 
Delete
Detection 
Document
Welcome  
Bye
Privatelink
Simi
Sticker`
        let us = `${isAdmin ? ad : `${m.isGroup ? 'Autolevelup' : 'Autolevelup\nDocument\nSimi\nSticker'}`}`
        let er = `${isOwner ? ow : us}`
        let ero = er.split`\n`
        let listeror = []
        for (let eror of ero) {
           listeror.push({
              title: eror,
	          rowId: usedPrefix + command + ' ' + eror,
           })
        }
        let section = [{
          title: `Slect your options`,
          rows: listeror
        }]
        let msg = {
          title: ``,
          text: `Please select options below!`,
          mentions: [m.sender],
          footer: wm,
          buttonText: `Click Here`,
          sections: section  
        }      
        if (!/[01]/.test(command)) return conn.sendMessage(m.chat, msg, {quoted: m})
    }
    m.reply(`*${type}* berhasil di ${isEnable ? 'nyala' : 'mati'}kan ${isAll ? 'untuk *Bot* ini!' : isUser ? '' : 'untuk *Chat* ini!'}`)
}
handler.help = ['on ', 'off '].map(v => v + '[option]')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
  
module.exports = handler 
