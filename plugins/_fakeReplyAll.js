let handler = m => m
handler.before = async function(m, { conn }){
  global.fake = {
  //=====================================================================================================================
    // audio / vn = true or false
    audio: (ptt = false, sec, par, rem) => ({
      key: { 
        fromMe: false,
        participant: par ? par.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : par || `0@s.whatsapp.net`,
	remoteJid: rem || "status@broadcast"
      },
      message: { 
        audioMessage: {
          mimetype: "audio/ogg; codecs=opus",
          seconds: sec || 1222,
          ptt: ptt
        }
      } 
    }),
    // kontak
    contact: (num, nam, par, rem) => ({
      key: { 
        fromMe: false, 
        participant: par ? par.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : par || `0@s.whatsapp.net`,
        remoteJid: rem || 'status@broadcast' 
      },
      message: { 
        contactMessage: {
          displayName: nam || m.name,
          vcard: `BEGIN: VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${'0@s.whatsapp.net'}\nitem1.TEL;waid=${parseInt(num) || parseInt(m.sender)}:${parseInt(num) || parseInt(m.sender)}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
        }
      }
    }),
    shop: async(tit, buff, par, rem) => ({   
      key: { 
	fromMe: false, 
	participant: par || `0@s.whatsapp.net`,
        remoteJid: rem || 'status@broadcast' 
      },
      message: {
        productMessage: {
          product: {
            productImage:{
              mimetype: "image/jpeg",
              jpegThumbnail: buff // || await conn.resize("")
	    },
            title: set.wm + ' 2022'|| tit, //Kasih namalu 
            description: "SELF BOT", 
            currencyCode: ["AUD", "USD", "INR", "IDR", "XOF", "ZAR", "EUR", "MYR"].getRandom(),
            priceAmount1000: 2022,
            retailerId: "Ghost",
            productImageCount: 1
	  },
          businessOwnerJid: `0@s.whatsapp.net`
        }
      }
    }),
    text: (tek, par, rem) => ({
	    key: {
		    fromMe: false,
		    participant: par || '0@s.whatsapp.net',		    
		    remoteJid: rem || "status@broadcast"
	    },
	    message: {
		    conversation: tek
	    }
               
    })
  //======================================================================================================================
  }
}
handler.exp = 0
module.exports = handler
