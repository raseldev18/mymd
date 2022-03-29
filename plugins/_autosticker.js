let handler = m => m

handler.before = async function (m) {
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    const isUrl = (text) => {
          return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
        }
    if (chat.stiker && !user.banned && !chat.isBanned && !m.fromMe && !m.isBaileys) {
        //if((!m.isBaileys || m.fromMe)) return
        if (/^.*s(tic?ker)?(gif)?$/i.test(m.text)) return
        let q = m
        let stiker = false
        let mime = (q.msg || q).mimetype || ''
        if (/webp/.test(mime)) return
        if (/image/.test(mime)) {
            let img = await q.download()
            if (!img) return
            this.sendStimg(m.chat, img, m, { packname: packname, author: author })
        } else if (/video/.test(mime)) {
            if ((q.msg || q).seconds > 15) throw false // m.reply('Maksimal 10 detik!')
            let vid = await q.download()
            if (!vid) return
            this.sendStimg(m.chat, vid, m, { packname: packname, author: author })  
        } else if (isUrl) {
            if ((q.msg || q).seconds > 15) throw false
            let url = q
            if(!url) return 
            this.sendStimg(m.chat, `${url}`, m, { packname: packname, author: author })  
        }
    }
    return true
}
module.exports = handler
