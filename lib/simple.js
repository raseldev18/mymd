const {
    default: makeWASocket,
    makeWALegacySocket,
    extractMessageContent,
    makeInMemoryStore,
    proto,
    prepareWAMessageMedia,
    downloadContentFromMessage,
    getBinaryNodeChild,
    jidDecode,
    areJidsSameUser,
    generateWAMessage, 
    generateForwardMessageContent,
    generateWAMessageFromContent,
    WAMessageStubType,
    WA_DEFAULT_EPHEMERAL,
    delay
} = require('baileys')
const { toAudio, toPTT, toVideo } = require('./converter')
const chalk = require('chalk')
const fetch = require('node-fetch')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const fs = require('fs')
const jimp = require('jimp')
const path = require('path')
const pino = require('pino')
const util = require('util')
const storeSystem = require('./store.js')
const store = storeSystem.makeInMemoryStore()
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./exif')
const { sticker, sticker5, sticker6, addExif } = require('../lib/sticker.js')
const uploadFile = require('../lib/uploadFile.js')
const uploadImage = require('../lib/uploadImage.js')
const { webp2png } = require('../lib/webp2mp4.js')
const WSF = require('wa-sticker-formatter')
const tr = require('translate-google-api')
const tr2 = require('translate-google')
const moment = require('moment-timezone')

exports.makeWASocket = (connectionOptions, options = {}) => {
    let conn = (set.opts['legacy'] ? makeWALegacySocket : makeWASocket)(connectionOptions)

    conn.loadMessage = (messageID) => {
      return Object.entries(conn.chats)
      .filter(([_, { messages }]) => typeof messages === 'object')
      .find(([_, { messages }]) => Object.entries(messages)
      .find(([k, v]) => (k === messageID || v.key?.id === messageID)))
      ?.[1].messages?.[messageID]
    }

    conn.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    if (conn.user && conn.user.id) conn.user.jid = conn.decodeJid(conn.user.id)
    conn.chats = {}
    conn.contacts = {}

    function updateNameToDb(contacts) {
        if (!contacts) return
        for (let contact of contacts) {
            let id = conn.decodeJid(contact.id)
            if (!id) continue
            let chats = conn.contacts[id]
            if (!chats) chats = { id }
            let chat = {
                ...chats,
                ...({
                    ...contact, id, ...(id.endsWith('@g.us') ?
                        { subject: contact.subject || chats.subject || '' } :
                        { name: contact.notify || chats.name || chats.notify || '' })
                } || {})
            }
            conn.contacts[id] = chat
        }
    }
    
    conn.ev.on('contacts.upsert', updateNameToDb)
    conn.ev.on('groups.update', updateNameToDb)
    conn.ev.on('group-participants.update', async function updateParticipantsToDb({ id, participants, action }) {
        id = conn.decodeJid(id)
        if (!(id in conn.contacts)) conn.contacts[id] = { id }
        let groupMetadata = Object.assign((conn.contacts[id].metadata || {}), await conn.groupMetadata(id))
        for (let participant of participants) {
            participant = conn.decodeJid(participant)
            switch (action) {
                case 'add': {
                    if (participant == conn.user.jid) groupMetadata.readOnly = false
                    let same = (groupMetadata.participants || []).find(user => user && user.id == participant)
                    if (!same) groupMetadata.participants.push({ id, admin: null })
                }
                    break
                case 'remove': {
                    if (participant == conn.user.jid) groupMetadata.readOnly = true
                    let same = (groupMetadata.participants || []).find(user => user && user.id == participant)
                    if (same) {
                        let index = groupMetadata.participants.indexOf(same)
                        if (index !== -1) groupMetadata.participants.splice(index, 1)
                    }
                }
                    break
            }
        }
        conn.contacts[id] = {
            ...conn.contacts[id],
            subject: groupMetadata.subject,
            desc: groupMetadata.desc?.toString(),
            metadata: groupMetadata
        }
    })

    conn.ev.on('groups.update', function groupUpdatePushToDb(groupsUpdates) {
        for (let update of groupsUpdates) {
            let id = conn.decodeJid(update.id)
            if (!id) continue
            if (!(id in conn.contacts)) conn.contacts[id] = { id }
            if (!conn.contacts[id].metadata) conn.contacts[id].metadata = {}
            let icon = update.icon
            if (icon) conn.contacts[id].icon = icon
            let subject = update.subject
            if (subject) conn.contacts[id].subject = subject
            let desc = update.desc
            if (desc) conn.contacts[id].desc = desc
            let revoke = update.revoke
            if (revoke) conn.contacts[id].revoke = revoke 
            let announce = update.announce
            if (announce) conn.contacts[id].announce = announce
            let restrict = update.restrict
            if (restrict) conn.contacts[id].restrict = restrict 
        }
    }) 
    conn.ev.on('chats.upsert', function chatsUpsertPushToDb(chats_upsert) {
        // console.log({ chats_upsert })
    })
    conn.ev.on('presence.update', function presenceUpdatePushToDb({ id, presences }) {
        let sender = Object.keys(presences)[0] || id
        let _sender = conn.decodeJid(sender)
        let presence = presences[sender]['lastKnownPresence'] || 'composing'
        if (!(_sender in conn.contacts)) conn.contacts[_sender] = {}
        conn.contacts[_sender].presences = presence
    })
    
    /* conn.ws.on('CB:call', async function callUpdatePushToDb(json) {
        // console.log({ json })
    }) */

    conn.logger = {
        ...conn.logger,
        info(...args) { console.log(chalk.bold.rgb(57, 183, 16)(`INFO [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.cyan(util.format(...args))) },
        error(...args) { console.log(chalk.bold.rgb(247, 38, 33)(`ERROR [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.rgb(255, 38, 0)(util.format(...args))) },
        warn(...args) { console.log(chalk.bold.rgb(239, 225, 3)(`WARNING [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.keyword('orange')(util.format(...args))) }
    }
    /**
     * waitEvent
     * @param {*} eventName 
     * @param {Boolean} is 
     * @param {Number} maxTries 
     * @returns 
     */
    conn.waitEvent = (eventName, is = () => true, maxTries = 25) => {
        return new Promise((resolve, reject) => {
            let tries = 0
            let on = (...args) => {
                if (++tries > maxTries) reject('Max tries reached')
                else if (is()) {
                    conn.ev.off(eventName, on)
                    resolve(...args)
                }
            }
            conn.ev.on(eventName, on)
        })
    }
    
    conn.preSudo = async (text, who, m, chatUpdate) => {
    	let messages = await generateWAMessage(m.chat, { text, mentions: conn.parseMention(text) }, {
           userJid: who,
           quoted: m.quoted && m.quoted.fakeObj
    	})
    	messages.key.fromMe = areJidsSameUser(who, conn.user.id)
    	messages.key.id = m.key.id
    	messages.pushName = m.name
    	if (m.isGroup)
            messages.key.participant = messages.participant = who
            let msg = {
		...chatUpdate,
		messages: [proto.WebMessageInfo.fromObject(messages)].map(v => (v.conn = this, v)),
		type: 'append'
            }
	return msg
    } 
    // NEW FUNCTION
    // get buffer
    conn.getBuffer = async (url, options) => {
        try {
          options ? options : {}
          const res = await axios({
             method: "get",
             url,
             headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
             },
                ...options,
                responseType: 'arraybuffer'
             })
                return res.data
             } catch {
               try {
                 let { data } = await conn.getFile(url)
                 return data
               } catch (e) {
                 console.log(`[ Error ] : ${e}`)
             }
         }
    }
   // set profile Picture
    conn.updateProfilePicture = async(jid, path) => {
	 let { data } = await conn.getFile(path)
         let img = await generateProfilePicture(data) 
         await conn.query({
             tag: 'iq',
             attrs: {
                to: jid,
                type: 'set',
                xmlns: 'w:profile:picture'
             },
             content: [{
                 tag: 'picture',
                 attrs: {
                    type: 'image'
                 },
                    content: img
             }]
         })
     }
     
    // set profile status
    conn.updateProfileStatus = async (status) => {
        return await conn.query({
            tag: 'iq',
            attrs: {
                to: 's.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [
                {
                    tag: 'status',
                    attrs: {},
                    content: Buffer.from(status, 'utf-8')
                }
            ]
        })
        // <iq to="s.whatsapp.net" type="set" xmlns="status" id="21168.6213-69"><status>"Hai, saya menggunakan WhatsApp"</status></iq>
    } 
    // readmore
    conn.readmore = String.fromCharCode(8206).repeat(4001)
    // resize
    conn.resize = async (path, uk1, uk2) => {
        let { data } = await conn.getFile(path)
	return new Promise(async(resolve, reject) => {
          let baper = await jimp.read(data)
          let ab = await baper.resize(uk1 || 300, uk2 || 300).getBufferAsync(jimp.MIME_JPEG)
          resolve(ab)
        })
    } 
    // send sticker
    conn.sendSticker = async(jid, path, quoted, options = {}) => {
        let { data, mime } = await conn.getFile(path)
	if (options.asSticker) {
          let stiker = false
          try {
            if (options && (options.packname || options.author)) {
              stiker = await sticker6(data, false)
              stiker = await addExif(stiker, options.packname, options.author, options.categories)
            } else {
              stiker = await sticker6(data, false)
            }
          } catch (e){
            console.log('Sticker 1 eror, mencoba sticker 2')
	    if (options && (options.packname || options.author)) {
              stiker = new WSF.Sticker(data, { pack: options.packname, author: options.author, crop: /video/g.test(mime) })
            } else {
              stiker = new WSF.Sticker(data)
            }
            await stiker.build()
            stiker = await stiker.get()
          }
          return await conn.sendMessage(jid, { sticker: stiker, ...options }, { quoted, ...options })
        }
        let buffer
        try {
          if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(data, options)
          } else {
            buffer = await imageToWebp(data)
          }
        } catch {
          console.log('Sticker 1 eror, mencoba sticker 2')
	  if (options && (options.packname || options.author)) {
            buffer = new WSF.Sticker(data, { pack: options.packname, author: options.author, crop: /video/g.test(mime) })
          } else {
            buffer = new WSF.Sticker(data)
          }
          await buffer.build()
          buffer = await buffer.get()
	}
        return await conn.sendMessage(jid, { sticker: Buffer.isBuffer(buffer) ? buffer : { url: buffer }, ...options }, { quoted, ...options })
    } 
    // send media all type
    conn.sendMedia = async (jid, path, quoted, options = {}) => {
        let { ext, mime, data } = await conn.getFile(path)
        let messageType = mime.split("/")[0]
        let pase = messageType.replace('application', 'document') || messageType
        return await conn.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted }) // quoted, ephemeralExpiration: jid.endsWith('g.us') ? conn.chats[jid].metadata.ephemeralDuration : WA_DEFAULT_EPHEMERAL
    }
    // send contact
    conn.sendContact = async(jid, data, quoted, options = {}) => {
	if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
        let contacts = []
        for (let [number, name, info, label, email, region, website, other, other1, other2, other3, other4, other5] of data) {
           number = number.replace(/[^0-9]/g, '')
           let njid = number + '@s.whatsapp.net'
           let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}${info ? `\nitem.ORG:${info}` : ''}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}${label ? `\nitem1.X-ABLabel:${label}` : ''}${email ? `\nitem2.EMAIL;type=INTERNET:${email}` : ''}${email ? `\nitem2.X-ABLabel:📧 Email` : ''}${region ? `\nitem3.ADR:;;${region};;;;` : ''}${region ? `\nitem3.X-ABADR:ac` : ''}${region? `\nitem3.X-ABLabel:📍 Region` : ''}${website ? `\nitem4.URL:${website}` : ''}${website ? `\nitem4.X-ABLabel:Website` : ''}${other ? `\nitem5.X-ABLabel:${other}` : ''}${other1 ? `\nitem5.X-ABLabel:${other1}` : ''}${other2 ? `\nitem5.X-ABLabel:${other2}` : ''}${other3 ? `\nitem5.X-ABLabel:${other3}` : ''}${other4 ? `\nitem5.X-ABLabel:${other4}` : ''}${other5 ? `\nitem5.X-ABLabel:${other5}` : ''} //tambah sendiri kalo mau:v by bit.ly/AcellComel          
END:VCARD`.trim()
            contacts.push({ vcard, displayName: name })
         }
         return await conn.sendMessage(jid, {
           ...options,
           contacts: {
              ...options,
              displayName: (contacts.length >= 2 ? `${contacts.length} kontak` : contacts[0].displayName) || null,
              contacts,
           }
       }, { quoted, ...options })
    }
    // send payment
    conn.sendPayment = async(jid, text, from, curCode, amount, expTime, options = {}) => {      
        let note 
	let type 
        try { 
          type = await conn.getFile(text, true) 
        } catch { type = { res: null, data: null, filename: null } }
        try {
          let { res, data: file, filename: pathFile } = type
        if (res && res.status !== 200 || file.length <= 65536) {
        try { throw { json: JSON.parse(file.toString()) } }
             catch (e) { if (e.json) throw e.json }
        }
        const fileSize = fs.statSync(pathFile).size / 1024 / 1024
        if (fileSize >= 20000) throw new Error('File size is too big!')
        if (!type) options.asDocument = true
        let mtype = '', mimetype = options.mimetype || type.mime, convert
        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
        else if (/video/.test(type.mime)) mtype = 'video'
        else if (/audio/.test(type.mime)) (
            convert = await toAudio(file, type.ext),
            file = convert.data,
            pathFile = convert.filename,
            mtype = 'audio',
            mimetype = options.mimetype || 'audio/mpeg'
        )
        else mtype = 'document'
        if (options.asDocument) mtype = 'document'

        delete options.asSticker
        delete options.asLocation
        delete options.asVideo
        delete options.asDocument
        delete options.asImage

          note = {
             ...options,
             caption: options.caption || '',
             ptt: options.ptt || false,
             [mtype]: { url: pathFile },
             mimetype: options.mimetype || mimetype,
             fileName: options.fileName || pathFile.split('/').pop() || 'file'
          }
	} catch {   
          note = {
            extendedTextMessage: { 
              ...options,
              text: text || 'Hello word!',
              contextInfo: {  
                 mentionedJid: options.mention || conn.parseMention(text),
		 externalAdReply: {
                    showAdAttribution: options.showAdAttribution || true,
                 }
              }
            }
          }
	}
	let requestPaymentMessage = { 
          amount: {
            currencyCode: curCode || ['USD', 'INR', 'IDR'].getRandom()
          },
          expiryTimestamp: expTime ? new Date * isNumber(expTime) ? expTime : 1 : 0,
          amount1000: (amount || 123456789) * 1000,
          currencyCodeIso4217: curCode || ['USD', 'INR', 'IDR'].getRandom(),
          requestFrom: from || '0@s.whatsapp.net',
          noteMessage: note    
        }
        return await conn.relayMessage(jid, { requestPaymentMessage }, { })
    }
    // ====================================================================================================================//
    // OLD FUNCTION
    /**
     * getBuffer hehe
     * @param {String|Buffer} path
     * @param {Boolean} returnFilename
     */
    conn.getFile = async (PATH, returnAsFilename) => {
        let res, filename
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        if (data && returnAsFilename && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
        return {
            res,
            filename,
            ...type,
            data
        }
    }
  /**
    * Send Media/File with Automatic Type Specifier
    * @param {String} jid
    * @param {String|Buffer} path
    * @param {String} filename
    * @param {String} caption
    * @param {Object} quoted
    * @param {Boolean} ptt
    * @param {Object} options
    */
    conn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await conn.getFile(path, true)
        let { res, data: file, filename: pathFile } = type
        if (res && res.status !== 200 || file.length <= 65536) {
        try { throw { json: JSON.parse(file.toString()) } }
             catch (e) { if (e.json) throw e.json }
        }
        const fileSize = fs.statSync(pathFile).size / 1024 / 1024
        if (fileSize >= 500) throw new Error('File size is too big!')
        let opt = {}
        if (quoted) opt.quoted = quoted
        if (!type) options.asDocument = true
        let mtype = '', mimetype = options.mimetype || type.mime, convert
        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
        else if (/video/.test(type.mime)) mtype = 'video'
        else if (/audio/.test(type.mime)) (
            convert = await toAudio(file, type.ext),
            file = convert.data,
            pathFile = convert.filename,
            mtype = 'audio',
            mimetype = options.mimetype || 'audio/mpeg'
        )
        else mtype = 'document'
        if (options.asDocument) mtype = 'document'

        delete options.asSticker
        delete options.asLocation
        delete options.asVideo
        delete options.asDocument
        delete options.asImage

        let message = {
             ...options,
             caption: options.caption || caption || '',
             ptt: options.ptt || ptt,
             [mtype]: { url: pathFile },
             mimetype: options.mimetype || mimetype,
             fileName: options.fileName || filename || pathFile.split('/').pop() || 'file'
        }
        /**
          * @type {import('@adiwajshing/baileys').proto.WebMessageInfo}
          */
        let m
        try {
           m = await conn.sendMessage(jid, message, { ...opt, ...options })
        } catch (e) {
          console.error(e)
          m = null
        } finally {
          if (!m) m = await conn.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options })
          file = null // releasing the memory
          return m
       }
    }

    /**
     * Reply to a message
     * @param {String} jid
     * @param {String|Object} text
     * @param {Object} quoted
     * @param {Object} mentions [m.sender]
     */
    conn.reply = (jid, text = '', quoted, options) => {
        return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { ...options, text }, { quoted, ...options })
    }
    conn.fakeReply = (jid, text = '', fakeJid = conn.user.jid, fakeText = '', fakeGroupJid, options) => {
        return conn.sendMessage(jid, { text: text, mentions: options.mentions || conn.parseMention(text) }, { quoted: { key: { fromMe: fakeJid == conn.user.jid, participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }, ...options } })
    }
    conn.translate = async(text, from, to) => {
        let res = await tr(text, { from: from, to: to }).catch(async _=> [await tr2(text, { from: from, to: to })] )
        return res.toString()
    }
    
    /**
    * send Button
    * @param {String} jid 
    * @param {String} contentText 
    * @param {String} footer
    * @param {Buffer|String} buffer 
    * @param {String[]} buttons 
    * @param {proto.WebMessageInfo} quoted 
    * @param {Object} options 
    */
    conn.sendButton = async (jid, text = '', footer = '', buffer, buttons, quoted, options = {}) => {
	let type
        if (Array.isArray(buffer)) (options = quoted, quoted = buttons, buttons = buffer, buffer = null)
        else if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = null }
        if (!Array.isArray(buttons[0]) && typeof buttons[0] === 'string') buttons = [buttons]
        if (!options) options = {}
	let message = {
            ...options,
            [buffer ? 'caption' : 'text']: text || '',
            footer,
            buttons: buttons.map(btn => ({
                buttonId: btn[1] || btn[0] || '',
                buttonText: {
                    displayText: btn[0] || btn[1] || ''
                }
            })),
            ...(buffer ?
                options.asLocation && /image/.test(type.mime) ? {
                    location: {
                        ...options,
                        jpegThumbnail: await conn.resize(buffer)
                    }
                } : {
                    [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                } : {})
        }
        delete options.asLocation
        delete options.asVideo
        delete options.asDocument
        delete options.asImage
        return await conn.sendMessage(jid, message, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
    }

    /**
     * 
     * @param {String} jid 
     * @param {String} text 
     * @param {String} footer 
     * @param {fs.PathLike} buffer 
     * @param {String} url 
     * @param {String} urlText
     * @param {String} call 
     * @param {String} callText
     * @param {String} buttons 
     * @param {proto.WebMessageInfo} quoted 
     * @param {Object} options 
     */
    conn.sendHydrated = async (jid, text = '', footer = '', buffer, call, callText, url, urlText, buttons, quoted, options = {}) => {
        let type
        if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = buffer }
        if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === 'string' || Array.isArray(buffer))) (options = quoted, quoted = buttons, buttons = callText, callText = call, call = urlText, urlText = url, url = buffer, buffer = null)
        if (!options) options = {}
	let templateButtons = []
        if (call || callText) templateButtons.push({
            index: templateButtons.length + 1,
            callButton: {
                displayText: callText || call || '',
                phoneNumber: call || callText || ''
            }
        })
        if (url || urlText) templateButtons.push({
            index: 1,
            urlButton: {
                displayText: urlText || url || '',
                url: url || urlText || ''
            }
        })
        templateButtons.push(...(buttons.map(([text, id], index) => ({
            index: templateButtons.length + index + 1,
            quickReplyButton: {
                displayText: text || id || '',
                id: id || text || ''
            }
        })) || []))
        let message = {
            ...options,
            [buffer ? 'caption' : 'text']: text || '',
            footer,
            templateButtons,
            ...(buffer ?
                options.asLocation && /image/.test(type.mime) ? {
                    location: {
                        ...options,
                        jpegThumbnail: await conn.resize(buffer)
                    }
                } : {
                    [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                } : {})
        }

        delete options.asLocation
        delete options.asVideo
        delete options.asDocument
        delete options.asImage
        return await conn.sendMessage(jid, message, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
    } 
    
    conn.sendList = async(jid, title, text, footer, buttonText, buffer, listSections, quoted, options) => {
        if (buffer) try { (type = await conn.getFile(buffer), buffer = type.data) } catch { buffer = buffer }
        if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === 'string' || Array.isArray(buffer))) (options = quoted, quoted = listSections, listSections = buffer, buffer = null)
        if (!options) options = {}
        // send a list message!
        const sections = listSections.map(([title, rows]) => ({
            title: !nullish(title) && title || !nullish(rowTitle) && rowTitle || '',
            rows: rows.map(([rowTitle, rowId, description]) => ({
                title: !nullish(rowTitle) && rowTitle || !nullish(rowId) && rowId || '',
                rowId: !nullish(rowId) && rowId || !nullish(rowTitle) && rowTitle || '',
                description: !nullish(description) && description || ''
            }))
        }))

        const listMessage = {
            text,
            footer,
            title,
            buttonText,
            sections
        }
        return await conn.sendMessage(jid, listMessage, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
    }
    
    conn.sendListM = async(jid, title, text, footer, buttonText, titleRow, rows, quoted, options = {}) => {
        if (Array.isArray(titleRow)) (options = quoted, quoted = rows, rows = titleRow, titleRow = null)
        if (Array.isArray(buttonText)) (options = rows, quoted = titleRow, rows = buttonText, titleRow = null, buttonText = null)
        let section = [
		{
			title: titleRow || ucapan(),
			rows: [...rows]
		}
	]
        let listMessage = {
		...options,
		title: title || '',
		text: text || 'Hello',
		footer: footer || '',
                mentions: conn.parseMention(title + text + footer),
		buttonText: buttonText || 'Click Here',
		sections: section
        }
        return await conn.sendMessage(jid, listMessage, {
            quoted,
            upload: conn.waUploadToServer,
            ...options 
        })
    }

    /**
    * sendGroupV4Invite
    * @param {String} jid 
    * @param {*} participant 
    * @param {String} inviteCode 
    * @param {Number} inviteExpiration 
    * @param {String} groupName 
    * @param {String} caption 
    * @param {*} options 
    * @returns 
    */
    conn.sendGroupV4Invite = async(jid, to, inviteCode, inviteExpiration, groupName, caption, jpegThumbnail) => {
	return conn.relayMessage(to, {
            groupInviteMessage: { inviteCode: inviteCode,
               inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
               groupJid: jid,
               groupName: (groupName ? groupName : await conn.getName(jid)) || null,
               jpegThumbnail: Buffer.isBuffer(jpegThumbnail) ? jpegThumbnail : jpegThumbnail,
               caption: caption
            }
        })
    }

    /**
     * nemu
     * Message
     */
    conn.relayWAMessage = async (msg) => {
        let res = await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
        conn.ev.emit('messages.upsert', { messages: [msg], type: 'append' });
        return res
    }

    /**
    * cMod
    * @param {String} jid 
    * @param {*} message 
    * @param {String} text 
    * @param {String} sender 
    * @param {*} options 
    * @returns 
    */

    conn.cMod = async (jid, message, text = '', sender = conn.user.jid, options = {}) => {
        if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
        let copy = message.toJSON()
        delete copy.message.messageContextInfo
        delete copy.message.senderKeyDistributionMessage
        let mtype = Object.keys(copy.message)[0]
        let msg = copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') {
            msg[mtype] = { ...content, ...options }
            msg[mtype].contextInfo = {
                ...(content.contextInfo || {}),
                mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
            }
        }
        if (copy.participant) sender = copy.participant = sender || copy.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false
        return proto.WebMessageInfo.fromObject(copy)
    }
    /**
     * Exact Copy Forward
     * @param {String} jid
     * @param {Object} message
     * @param {Boolean|Number} forwardingScore
     * @param {Object} options
     */
    conn.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
        let m = generateForwardMessageContent(message, !!forwardingScore)
        let mtype = Object.keys(m)[0]
        if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
        m = generateWAMessageFromContent(jid, m, { ...options, userJid: conn.user.id })
        await conn.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } })
        return m
    }
    /**
     * Download media message
     * @param {Object} m
     * @param {String} type 
     * @param {fs.PathLike|fs.promises.FileHandle} filename
     * @returns {Promise<fs.PathLike|fs.promises.FileHandle|Buffer>}
     */
    conn.downloadM = async (m, type, saveToFile) => {
        /* if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
        const stream = await downloadContentFromMessage(m, type)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        if (filename) await fs.promises.writeFile(filename, buffer)
        return filename && fs.existsSync(filename) ? filename : buffer 
        */
	let filename
        if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
        const stream = await downloadContentFromMessage(m, type)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        if (saveToFile) ({ filename } = await conn.getFile(buffer, true))
        return saveToFile && fs.existsSync(filename) ? filename : buffer
    }
    /**
     * By Fokus ID
     * @param {*} message 
     * @param {*} filename 
     * @param {*} attachExtension 
     * @returns 
     */
    conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    /**
     * Parses string into mentionedJid(s)
     * @param {String} text
     */
    conn.parseMention = (text = '') => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }

    conn.saveName = async (id, name = '') => {
        if (!id) return
        id = conn.decodeJid(id)
        let isGroup = id.endsWith('@g.us')
        if (id in conn.contacts && conn.contacts[id][isGroup ? 'subject' : 'name'] && id in conn.chats) return
        let metadata = {}
        if (isGroup) metadata = await conn.groupMetadata(id)
        let chat = { ...(conn.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
        conn.contacts[id] = chat
        conn.chats[id] = chat
    }

    /**
     * Get name from jid
     * @param {String} jid
     * @param {Boolean} withoutContact
     */
    conn.getName = (jid = '', withoutContact = false) => {
        jid = conn.decodeJid(jid)
        withoutContact = conn.withoutContact || withoutContact
        let v
        if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
            v = conn.chats[jid] || {}
            if (!(v.name || v.subject)) v = await conn.groupMetadata(jid) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = jid === '0@s.whatsapp.net' ? {
            jid,
            vname: 'WhatsApp'
        } : areJidsSameUser(jid, conn.user.id) ?
            conn.user :
            (conn.chats[jid] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

    conn.processMessageStubType = async(m) => {
    /**
     * to process MessageStubType
     * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} m 
     */
    if (!m.messageStubType) return
        const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
    if (!chat || chat === 'status@broadcast') return
        const emitGroupUpdate = (update) => {
            conn.ev.emit('groups.update', [{ id: chat, ...update }])
        }
        switch (m.messageStubType) {
            case WAMessageStubType.REVOKE:
            case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
            emitGroupUpdate({ revoke: m.messageStubParameters[0] })
            break
            case WAMessageStubType.GROUP_CHANGE_ICON:
            emitGroupUpdate({ icon: m.messageStubParameters[0] })
            break
            default: {
                console.log({
                    messageStubType: m.messageStubType,
                    messageStubParameters: m.messageStubParameters,
                    type: WAMessageStubType[m.messageStubType]
                })
                break
            }
        }
        const isGroup = chat.endsWith('@g.us')
        if (!isGroup) return
        let chats = conn.chats[chat]
        if (!chats) chats = conn.chats[chat] = { id: chat }
        chats.isChats = true
        const metadata = await conn.groupMetadata(chat).catch(_ => null)
        if (!metadata) return
        chats.subject = metadata.subject
        chats.metadata = metadata
    }
    conn.insertAllGroup = async() => {
        const groups = await conn.groupFetchAllParticipating().catch(_ => null) || {}
        for (const group in groups) conn.chats[group] = { ...(conn.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
            return conn.chats
    }
    conn.pushMessage = async(m) => {
    /**
     * pushMessage
     * @param {import('@adiwajshing/baileys').proto.WebMessageInfo[]} m 
     */
    if (!m) return
        if (!Array.isArray(m)) m = [m]
            for (const message of m) {
                try {
                // if (!(message instanceof proto.WebMessageInfo)) continue // https://github.com/adiwajshing/Baileys/pull/696/commits/6a2cb5a4139d8eb0a75c4c4ea7ed52adc0aec20f
                if (!message) continue
                    if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) conn.processMessageStubType(message).catch(console.error)
                        const _mtype = Object.keys(message.message || {})
                    const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
                    (_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
                    _mtype[_mtype.length - 1]
                    const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
                    if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
                    /**
                     * @type {import('@adiwajshing/baileys').proto.IContextInfo}
                     */
                    let context = message.message[mtype].contextInfo
                    let participant = conn.decodeJid(context.participant)
                    const remoteJid = conn.decodeJid(context.remoteJid || participant)
                    /**
                     * @type {import('@adiwajshing/baileys').proto.IMessage}
                     * 
                     */
                    let quoted = message.message[mtype].contextInfo.quotedMessage
                    if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
                        let qMtype = Object.keys(quoted)[0]
                        if (qMtype == 'conversation') {
                            quoted.extendedTextMessage = { text: quoted[qMtype] }
                            delete quoted.conversation
                            qMtype = 'extendedTextMessage'
                        }

                        if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
                        quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
                        const isGroup = remoteJid.endsWith('g.us')
                        if (isGroup && !participant) participant = remoteJid
                            const qM = {
                                key: {
                                    remoteJid,
                                    fromMe: areJidsSameUser(conn.user.jid, remoteJid),
                                    id: context.stanzaId,
                                    participant,
                                },
                                message: JSON.parse(JSON.stringify(quoted)),
                                ...(isGroup ? { participant } : {})
                            }
                            let qChats = conn.chats[participant]
                            if (!qChats) qChats = conn.chats[participant] = { id: participant, isChats: !isGroup }
                                if (!qChats.messages) qChats.messages = {}
                                    if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
                                        let qChatsMessages
                                        if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)) // maybe avoid memory leak
                                    }
                            }
                            if (!chat || chat === 'status@broadcast') continue
                                const isGroup = chat.endsWith('@g.us')
                            let chats = conn.chats[chat]
                            if (!chats) {
                                if (isGroup) await conn.insertAllGroup().catch(console.error)
                                    chats = conn.chats[chat] = { id: chat, isChats: true, ...(conn.chats[chat] || {}) }
                            }
                            let metadata, sender
                            if (isGroup) {
                                if (!chats.subject || !chats.metadata) {
                                    metadata = await conn.groupMetadata(chat).catch(_ => ({})) || {}
                                    if (!chats.subject) chats.subject = metadata.subject || ''
                                    if (!chats.metadata) chats.metadata = metadata
                                }
                            sender = conn.decodeJid(message.key?.fromMe && conn.user.id || message.participant || message.key?.participant || chat || '')
                            if (sender !== chat) {
                                let chats = conn.chats[sender]
                                if (!chats) chats = conn.chats[sender] = { id: sender }
                                if (!chats.name) chats.name = message.pushName || chats.name || ''
                            }
                    } else if (!chats.name) chats.name = message.pushName || chats.name || ''
                    if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
                        chats.isChats = true
                    if (!chats.messages) chats.messages = {}
                        const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, conn.user.id)
                    if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
                        delete message.message.messageContextInfo
                        delete message.message.senderKeyDistributionMessage
                        chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
                        let chatsMessages
                        if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
                    }
            } catch (e) {
                console.error(e)
            }
        }
    }

    /**
     * Serialize Message, so it easier to manipulate
     * @param {Object} m
     */
    conn.serializeM = (m) => {
        return exports.smsg(conn, m)
    }

    Object.defineProperty(conn, 'name', {
        value: { ...(options.chats || {}) },
        configurable: true,
    })
	
    if (conn.user?.id) conn.user.jid = conn.decodeJid(conn.user.id)
    store.bind(conn.ev)
    return conn
}
/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {Boolean} hasParent 
 */
exports.smsg = (conn, m, hasParent) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    m = M.fromObject(m)
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
        m.chat = conn.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = conn.decodeJid(m.key.fromMe && conn.user.id || m.participant || m.key.participant || m.chat || '')
        m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, conn.user.id)
    }
    if (m.message) {
        let mtype = Object.keys(m.message)
        m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || // Sometimes message in the front
            (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3!
            mtype[mtype.length - 1] // common case
        m.msg = m.message[m.mtype]
        if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
        if (m.mtype == 'protocolMessage' && m.msg.key) {
            if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
            if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
            m.msg.key.fromMe = conn.decodeJid(m.msg.key.participant) === conn.decodeJid(conn.user.id)
            if (!m.msg.key.fromMe && m.msg.key.remoteJid === conn.decodeJid(conn.user.id)) m.msg.key.remoteJid = m.sender
        }
        m.text = m.msg?.text || m.msg?.caption || m.msg?.contentText || m.msg || ''
        if (typeof m.text !== 'string') {
            if ([
                'protocolMessage',
                'messageContextInfo',
                'stickerMessage',
                'audioMessage',
                'senderKeyDistributionMessage'
            ].includes(m.mtype)) m.text = ''
            else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
        }
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if (m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = conn.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
            m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
            m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === conn.user.jid
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
            m.quoted.name = conn.getName(m.quoted.sender)
            m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    fromMe: m.quoted.fromMe,
                    remoteJid: m.quoted.chat,
                    id: m.quoted.id,
                    participant: m.quoted.sender
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return null
                let q = M.fromObject(await conn.loadMessage(m.quoted.id) || vM)
                return exports.smsg(conn, q)
            }
	    m.quoted.key = vM.key
            if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => conn.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
            
            /**
             * Reply to quoted message
             * @param {String|Object} text
             * @param {String|false} chatId
             * @param {Object} options
             */
            m.quoted.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, vM, options)
            
            /**
             * Copy quoted message
             */
            m.quoted.copy = () => exports.smsg(conn, M.fromObject(M.toObject(vM)))

            /**
             * Forward Quoted Message
             * @param {String} jid
             * @param {Boolean} forceForward
             */
            m.quoted.forward = (jid, forceForward = false) => conn.forwardMessage(jid, vM, forceForward)

            /**
             * Exact Forward quoted message
             * @param {String} jid
             * @param {Boolean|Number} forceForward
             * @param {Object} options
            */
            m.quoted.copyNForward = (jid, forceForward = true, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

            /**
             * Modify quoted Message
             * @param {String} jid
             * @param {String} tex
             * @param {String} sender
             * @param {Object} options
             */
            m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => conn.cMod(jid, vM, text, sender, options)

            /**
             * Delete quoted message
             */
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
        }
    }
    m.name = !nullish(m.pushName) && m.pushName || conn.getName(m.sender)
    if (m.msg && m.msg.url) m.download = (saveToFile = false) => conn.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)

    /**
     * Reply to this message
     * @param {String|Object} text
     * @param {String|false} chatId
     * @param {Object} options
     */
    m.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, m, options)

    /**
     * Reaction to this message
     * @param {String|Object} text
     */
     m.react = (text, key) => conn.sendMessage(m.chat, { react: { text: text, key: key ? key : m.key }})

     /**
     * Translate to this message
     * @param {String|Object} text
     */
     m.trans = (text, user) => conn.translate(text, "id", user ? user : db.data.users[m.sender].language)

    /**
     * Exact Forward this message
     * @param {String} jid
     * @param {Boolean} forceForward
     * @param {Object} options
     */
    m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => conn.copyNForward(jid, m, forceForward, options)

    /**
     * Modify this Message
     * @param {String} jid 
     * @param {String} text 
     * @param {String} sender 
     * @param {Object} options 
     */
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => conn.cMod(jid, m, text, sender, options)

    /**
     * Delete this message
     */
    m.delete = () => conn.sendMessage(m.chat, { delete: m.key })
    try {
        conn.saveName(m.sender, m.name)
        conn.pushMessage(m)
        if (m.isGroup) conn.saveName(m.chat)
        if (m.msg && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', m.msg.key)
    } catch (e) {
        console.error(e)
    }
    return m
}

exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

exports.protoType = () => {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
    const ab = new ArrayBuffer(this.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < this.length; ++i) {
        view[i] = this[i];
    }
    return ab;
  }
  /**
   * @returns {ArrayBuffer}
   */
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
    return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
  }
  /**
   * @returns {Buffer}
   */
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
    return Buffer.from(new Uint8Array(this))
  }
  // /**
  //  * @returns {String}
  //  */
  // Buffer.prototype.toUtilFormat = ArrayBuffer.prototype.toUtilFormat = Object.prototype.toUtilFormat = Array.prototype.toUtilFormat = function toUtilFormat() {
  //     return util.format(this)
  // }
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
    return await fileTypeFromBuffer(this)
  }
  /**
   * @returns {Boolean}
   */
  String.prototype.isNumber = Number.prototype.isNumber = isNumber
  /**
   *
   * @returns {String}
   */
  String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length)
  }
  /**
   * @returns {String}
   */
  String.prototype.capitalizeV2 = function capitalizeV2() {
    const str = this.split(' ')
    return str.map(v => v.capitalize()).join(' ')
  }
  String.prototype.decodeJid = function decodeJid() {
    if (/:\d+@/gi.test(this)) {
      const decode = jidDecode(this) || {}
      return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
    } else return this.trim()
  }
  /**
   * number must be milliseconds
   * @returns {string}
   */
  Number.prototype.toTimeString = function toTimeString() {
    // const milliseconds = this % 1000
    const seconds = Math.floor((this / 1000) % 60)
    const minutes = Math.floor((this / (60 * 1000)) % 60)
    const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
    const days = Math.floor((this / (24 * 60 * 60 * 1000)))
    return (
      (days ? `${days} day(s) ` : '') +
      (hours ? `${hours} hour(s) ` : '') +
      (minutes ? `${minutes} minute(s) ` : '') +
      (seconds ? `${seconds} second(s)` : '')
    ).trim()
  }
  Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}

function isNumber() {
  const int = parseInt(this)
  return typeof int === 'number' && !isNaN(int)
}

function getRandom() {
  if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
  return Math.floor(Math.random() * this)
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())] 
}

/**
 * ??
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
 * @returns {boolean}
 */
function nullish(args) {
  return !(args !== null && args !== undefined)
}

async function generateProfilePicture(buffer) {
  let anj = await jimp.read(buffer)
  let min = anj.getWidth()
  let max = anj.getHeight()
  let cropped = anj.crop(0, 0, min, max)
  return await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG)
}   

function ucapan() {
  let p = ['>//<', '^.^', '×͜×', 'ツ'].getRandom()
  let time = moment.tz('Asia/Jakarta').format('HH')
  let res = "Selamat dinihari oniichan " + p
  if (time >= 4) {
    res = "Selamat pagi aoniichan " + p
  }
  if (time > 10) {
    res = "Selamat siang oniichan " + p
  }
  if (time >= 15) {
    res = "Selamat sore oniichan " + p
  }
  if (time >= 18) {
    res = "Selamat malam oniichan " + p
  }
  return res
}
