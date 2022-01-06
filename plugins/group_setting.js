let handler  = async (m, { isAdmin, isOwner, conn, args, usedPrefix, command }) => {
	if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
                }
	if(!args || !args[0]) {
		conn.sendButton(m.chat, `*Format salah! Contoh :*\n\n*○ ${usedPrefix + command} close*\n*○ ${usedPrefix + command} open*`.trim(), wm, false, [[`Buka`, `${usedPrefix}buka`], [`Tutup`, `${usedPrefix }tutup`]], m)
	} else if(args[0] == 'open') {
		conn.groupSettingUpdate(m.chat, 'not_announcement')
		conn.sendMessage(m.chat, `*Success open group*`, m) 
	}
     }
   
	} else if(args[0] == 'close') {
		conn.groupSettingUpdate(m.chat, 'announcement')
		conn.sendMessage(m.chat, `*Success close group*`, m) 
	}
     }

	} else if(args[0] == 'buka') {
		conn.groupSettingUpdate(m.chat, 'not_announcement')
		conn.sendMessage(m.chat, `*Berhasil buka grup*`, m) 
	}
     }

	} else if(args[0] == 'tutup') {
		conn.groupSettingUpdate(m.chat, 'announcement')
		conn.sendMessage(m.chat, `*Berhasil tutup grup*`, m) 
	}
     }

}
handler.help = ['group <open>/<close>']
handler.tags = ['group']
handler.command = /^(group|gru?p|gc)$/i

handler.botAdmin = true

module.exports = handler
