let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    let isEnable = /true|enable|(turn)?on|1/i.test(command)
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let setting = global.db.data.settings
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
        case 'detect':
        case 'deteksi':
        case 'detek':
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
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.delete = isEnable
        break
        case 'antid':
        case 'antidel':
        case 'antidelete':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.antidelete = !isEnable
        break
        case 'antibadword':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.antiBadword = isEnable
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
        case 'antivirtex':
        case 'antivirtext':
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
         chat.antiVirtext = isEnable
         break
        case 'antitroli':
        isAll = true
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.antitroli = isEnable
        break
        case 'document':
        case 'doc':
        case 'dokumen':
        case 'dok':
        chat.useDocument = isEnable
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
        case 'antilink':
        case 'antiurl':
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
        case 's':
        case 'stiker':
        case 'sticker':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
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
        conn.callWhitelistMode = isEnable
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
        global.opts['gconly'] = isEnable
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
        case 'publicjoin': 
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.publicjoin = isEnable
        break
        case 'autoread':
        case 'read':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        opts['autoread'] = isEnable
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
        case 'typing':
        case 'type':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        opts['typing'] = isEnable
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
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
        }
        setting.autogetmsg = isEnable
        setting.getmsg = isEnable
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
        setting.antivirus = true
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
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        chat.nsfw = isEnable
        break
        case 'mature':
        if (!m.isGroup) {
          if (!isOwner) {
            global.dfail('group', m, conn)
            throw false
          }
        } else if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
        setting.mature = isEnable
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
        chat.simi = isEnable
          break
        case 'antitoxic':
            if (m.isGroup) {
              if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
              }
            }
            chat.antitoxic = isEnable
            break
        case 'download':
        case 'autodownload':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.autodownload = isEnable
            break
            case 'sw':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.sw = isEnable
            break
      default:
        if (!/[01]/.test(command)) throw `
${sa}${kki} *Daftar Opsi* ${kka}${isOwner ? `\n${gy} anon\n${gy} antispam\n${gy} antitroli\n${gy} autoread\n${gy} antitoxic\n${gy} backup\n${gy} antivirus\n${gy} status\n${gy} getmsg\n${gy} publicjoin\n${gy} clear\n${gy} grouponly\n${gy} jadibot\n${gy} mengetik\n${gy} nsfw\n${gy} public\n${gy} mycontact` : ''}
${gy} antilink 
${gy} autolevelup 
${gy} delete
${gy} detect
${gy} stiker
${gy} simi
${gy} welcome
${sb}

contoh:
${usedPrefix}on welcome
${usedPrefix}off welcome
`.trim()
        throw false
    }
    conn.reply(m.chat, `
  *${type}* berhasil di *${isEnable ? 'nyala' : 'mati'}kan* ${isAll ? 'untuk bot ini' : isUser ? '' : 'untuk chat ini'}
  `.trim(), m)
  }
  handler.help = ['on', 'off'].map(v => v + ' <opsi>')
  handler.tags = ['group', 'owner']
  handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
  
  module.exports = handler
  
