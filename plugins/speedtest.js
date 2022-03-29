let cp = require('child_process')
let { promisify } = require('util')
let exec = promisify(cp.exec).bind(cp)
let handler = async (m, { conn }) => {
    m.reply(`_Testing speed-test..._`)
    let o
    try {
        o = await exec('python speed.py')
    } catch (e) {
        o = e
    } finally {
        let { stdout, stderr } = o
        if (stdout.trim()) conn.reply(m.chat, stdout, 0, {mentions: [m.sender]})
        if (stderr.trim()) conn.reply(m.chat, stderr, 0, {mentions: [m.sender]})
    }
}
handler.help = ['speedtest']
handler.tags = ['info']
handler.command = /^(sp(ee)?d?t(est?)?|test?spe?ed)$/i

module.exports = handler
