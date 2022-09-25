let handler = async (m, { conn, args, usedPrefix, command }) => {
  conn.math = conn.math ? conn.math : {}
  let id = m.chat
  if (id in conn.math) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.math[id][0])
  let mode = args[0] ? args[0].toLowerCase() : ''
  let jsonMode = Object.keys(modes)
  let row = []
  for (let modenya of jsonMode) {
     row.push({
       title: 'Math ' + modenya.capitalize(),
       rowId: `${usedPrefix + command} ${modenya}`
     })
  } 
  if (args.lenth < 1) return conn.sendListM(m.chat, `${se.sa} M A T H E M A T I C S\n`, `${set.sb} *Example* : ${usedPrefix + command} ${pickRandom(jsonMode)}`, set.wm, row, m)
  if (!(mode in modes)) return conn.sendListM(m.chat, `${set.sa} M A T H E M A T I C S\n`, `${set.sb} *Example* : ${usedPrefix + command} ${pickRandom(jsonMode)}`, set.wm, row, m)
  let math = genMath(mode)
  conn.math[id] = [
    await conn.reply(m.chat, `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(0)} detik\nBonus Jawaban Benar: ${math.bonus} XP\n\nKesempatan menjawab 4X`, m),
    math, 4,
    setTimeout(async () => {
      if (conn.math[id]) conn.sendListM(m.chat, `${set.sa} T I M E  O U T\n`, `Waktu habis!\nJawabannya adalah *${math.result}*`, set.wm, row, conn.math[id][0])                       
      delete conn.math[id]
    }, math.time)
  ]
}
handler.help = ['math <mode>']
handler.tags = ['game']
handler.command = /^math/i
module.exports = handler

let modes = {
  noob: [-3, 3, -3, 3, '+-', 15000, 10],
  easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
  medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
  hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
  extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
  impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
  impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000]
}

let operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
}

function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
  let a = randomInt(a1, a2)
  let b = randomInt(b1, b2)
  let op = pickRandom([...ops])
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
  if (op == '/') [a, result] = [result, a]
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result
  }
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from]
  from = Math.floor(from)
  to = Math.floor(to)
  return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
