let handler = async (m, { conn, usedPrefix, command, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return { ...value, jid: key }
  })
  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
  let sortedMoney = users.map(toNumber('money')).sort(sort('money'))
  let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
  let usersExp = sortedExp.map(enumGetKey)
  let usersMoney = sortedMoney .map(enumGetKey)
  let usersLim = sortedLim.map(enumGetKey)
  let usersLevel = sortedLevel.map(enumGetKey)
  console.log(participants)
  let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
  let text = `*• Leaderboard XP Top: ${len}*
Kamu: *${usersExp.indexOf(m.sender) + 1}* dari *${usersExp.length}*
${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${exp} Exp*`).join`\n`}

*• Leaderboard Money Top: ${len}*
Kamu: *${usersMoney.indexOf(m.sender) + 1}* dari *${usersMoney.length}*
${sortedMoney.slice(0, len).map(({ jid, money }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${money} Money*`).join`\n`}

*• Leaderboard Limit Top: ${len}*
Kamu: *${usersLim.indexOf(m.sender) + 1}* dari *${usersLim.length}*
${sortedLim.slice(0, len).map(({ jid, limit }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${limit} Limit*`).join`\n`}

*• Leaderboard Level Top: ${len}*
Kamu: *${usersLevel.indexOf(m.sender) + 1}* dari *${usersLevel.length}*
${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *Level ${level}*`).join`\n`}
`
  conn.sendBL(m.chat, text, wm, fla + `leaderboard top ${len}`, [[`Menu`, `${usedPrefix}menu`]], m, {
    //contextInfo: {
      mentions: [...usersExp.slice(0, len), ...usersLim.slice(0, len), ...usersLevel.slice(0, len)].filter(v => !participants.some(p => v === p.jid))
    //}
  })
}
handler.help = ['leaderboard [jumlah user]']
handler.tags = ['xp']
handler.command = /^(leaderboard|lb(user)?)$/i

module.exports = handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
