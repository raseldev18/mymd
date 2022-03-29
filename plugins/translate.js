const translate = require('translate-google-api')
const translate2 = require('translate-google')
const defaultLang = 'id'
const tld = 'cn'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let err = `
Contoh:
${usedPrefix + command} <lang> [text]
${usedPrefix + command} id your messages

Daftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages
`.trim()

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted && m.quoted.text) text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : 'teksnya mana?'

    let result
    try {
        result = await translate(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result = await translate(`${text}`, {
            tld,
            to: defaultLang,
        })
        throw err
    } finally {
        if(result) return conn.reply(m.chat, result, m)
        else return 
    let result2
    try {
        result2 = await translate2(`${text}`, {
            tld,
            to: lang,
        })
    } catch (e) {
        result2 = await translate2(`${text}`, {
            tld,
            to: defaultLang,
        })
        throw err
    } finally {
        conn.reply(m.chat, result2, m)
    }
  }
}
handler.help = ['translate'].map(v => v + ' <lang> <teks>')
handler.tags = ['tools']
handler.command = /^(tr(anslate)?)$/i

module.exports = handler

