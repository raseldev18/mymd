let handler = async(m, { conn }) => {

	const vcard = `BEGIN:VCARD
VERSION:3.0
N:;;;;
FN:rasel comel
item1.X-ABLabel:👤 Gada pawang nih senggol dong 😣
URL;Web:🔥 http://github.com/raselcomel
EMAIL;📧 Email:✨ raselcomel18@gmail.com
ORG: 👑 creator
item4.ADR:;;🇮🇩 Indonesia;;;;
item4.X-ABADR:ac
item4.X-ABLabel:🌍 Region
TEL;🚫 don't spam/call;waid= ${owner[0]}:${owner[0]}
END:VCARD`
	const vcard2 = `BEGIN:VCARD
VERSION:3.0
N:;;;;
FN:rasel comel
item1.X-ABLabel:👤 Gada pawang nih senggol dong 😣
URL;Web:🔥 http://github.com/raselcomel
EMAIL;📧 Email:✨ raselcomel18@gmail.com
ORG: 👑 creator
item4.ADR:;;🇮🇩 Indonesia;;;;
item4.X-ABADR:ac
item4.X-ABLabel:🌍 Region
TEL;🚫 don't spam/call;waid= ${owner[1]}:${owner[1]}
END:VCARD`

const sentMsg  = await sock.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'raselcomel <3', 
            contacts: [{ vcard }, { vcard2 }] }
       },
      {quoted: m}
   )
  await conn.reply(m.chat, `Halo kak ${await conn.getName(m.sender)} itu nomor ownerku jangan di apa-apain ya kak😖`, sentMsg, { mentions: [m.sender] })
}

handler.help = ['owner2']
handler.tags = ['info']
handler.command = /^(owner2)$/i

module.exports = handler
