/* const { makeWASocket, protoType, serialize } = require("../lib/simple.js")
const { toBuffer, toDataURL } = require("qrcode")
const {
  DisconnectReason,
  useSingleFileAuthState
} = require("baileys")
const util = require("util")
const fs = require("fs")
const WebSocket = require('ws')

let handler = async(m, { conn: _conn }) => {
  if(!fs.existsSync("jadibot/")) fs.mkdirSync("jadibot")
  global.conns = global.conns || {}
  //if(global.conns[m.sender]) return m.reply("Kamu sudah jadi bot :|")

  const { state, saveState } = useSingleFileAuthState(`jadibot/user-${m.sender.split("@")[0]}.json`)

  function start() {
    const conn = makeWASocket({
      printQRInTerminal: false,
      auth: state
    })
    const logout = async() => {
      await _conn.reply(conn.user?.jid || m.chat, "Koneksi terputus...", m)
      try { conn.ws.close() } catch {}
      delete global.conns[m.sender]
    }
    let lastQr, shouldSendLogin, errorCount = 0

    conn.welcome = _conn.welcome + ""
    conn.bye = _conn.bye + ""
    conn.spromote = _conn.spromote + ""
    conn.sdemote = _conn.sdemote + ""
    conn.handler = _conn.handler.bind(_conn)
    conn.onDelete = _conn.onDelete.bind(_conn)
    conn.participantsUpdate = _conn.participantsUpdate.bind(_conn)
    conn.groupsUpdate = _conn.groupsUpdate.bind(_conn)
    conn.ev.on("messages.upsert", _conn.handler)
    conn.ev.on("messages-delete", _conn.onDelete)
    conn.ev.on("group-participants.update", _conn.participantsUpdate)
    conn.ev.on("groups.update", _conn.groupsUpdate)
    conn.ev.on("creds.update", saveState)
    conn.ev.on("connection.update", async({ qr, isNewLogin, lastDisconnect })=> {
      conn.ev.emit("multi.sessions", _conn)
      if(shouldSendLogin && conn.user) await _conn.sendMessage(conn.user.jid, { text: 'Berhasil tersambung dengan WhatsApp - mu.\n*NOTE: Ini cuma numpang*\n' + JSON.stringify(conn.user, null, 2) }, { quoted: m })

      if(qr) {
        if(lastQr) await lastQr.delete()
        let buff = await toBuffer(qr, { small: true })
        lastQr = await _conn.sendFile(
          m.chat,
          buff,
          'qrqode.png',
          `Scan QR ini untuk jadi bot sementara

1. Klik titik tiga di pojok kanan atas
2. Ketuk perangkat tertaut
3. Scan QR ini

QR akan Expired!
`.trim(),
          m
        )
      }

      if(isNewLogin) shouldSendLogin = true

      if(lastDisconnect) {
        const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
        if(code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== WebSocket.CONNECTING) {
          console.log(await global.set.reloadHandler(true))
        } else if(code == DisconnectReason.loggedOut) logout()
        errorCount++
      }

      if(errorCount > 5) await logout()
    })

    global.conns[m.sender] = conn
  }
  return start()
}
handler.help = ["jadibot"].map(v => v + " <beta>")
handler.tags = ["jadibot"]
handler.owner = true
handler.command = /^(jadibot)$/i
module.exports = handler */
