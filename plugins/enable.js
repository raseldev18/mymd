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
        if (m.isGroup) {
          if (!(isAdmin || isOwner)) {
            global.dfail('admin', m, conn)
            throw false
          }
        }
        chat.autodelvn = isEnable
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
      case 'gruponly':
      case 'grouponly':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.groupOnly = isEnable
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
        set.backup = isEnable
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
      case 'antitroli':
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.antitroli = isEnable
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
        set.autoupdatestatus = isEnable
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
        isAll = true
        if (!isOwner) {
          global.dfail('owner', m, conn)
          throw false
        }
        setting.nsfw = isEnable
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
╭─「 Daftar Opsi 」${isOwner ? '\n│• anon\n│• antispam\n│• antitroli\n│• autoread\n│• antitoxic\n│• backup\n│• antivirus\n│• status\n│• getmsg\n│• publicjoin\n│• clear\n│• grouponly\n│•jadibot\n│• nsfw\n│• public\n│• mycontact' : ''}
│• antilink 
│• autolevelup 
│• delete
│• detect
│• document 
│• stiker
│• simi
│• welcome
╰────
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
  