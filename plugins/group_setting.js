let handler = async (m, { isAdmin, isOwner, conn, args, usedPrefix, command }) => {
  if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
	let isClose = {
		'open': 'not_announcement',
		'buka': 'not_announcement',
		'on': 'not_announcement',
		'1': 'not_announcement',
		'close': 'announcement',
		'tutup': 'announcement',
		'off': 'announcement',
		'0': 'announcement',
	}[(args[0] || '')]
	if (isClose === undefined) {
		await conn.sendButton(m.chat, `
contoh:
${usedPrefix + command} tutup
${usedPrefix + command} buka
	`.trim(), wm, null, [['Buka', '#grup 1'], ['Tutup', '#grup 0']])
		throw false
	}
	await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['grup <open/close>']
handler.tags = ['admin']
handler.command = /^(gro?up|gc?)$/i

handler.botAdmin = true

module.exports = handler
