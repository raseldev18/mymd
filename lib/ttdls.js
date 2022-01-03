const axios = require('axios')
const cheerio = require('cheerio')
const FormData = require('form-data')
 
async function tiktokdl2(Url) {
	return new Promise (async (resolve, reject) => {
		const BodyForm = new FormData()
		BodyForm.append('url', encodeURI(Url))
		await axios({
			url: "https://snaptik.app/action.php?lang=ID",
			method: "POST",
			data: BodyForm,
			headers: {
				"accept": "*/*",
				"accept-language": "en-US,en;q=0.9,id;q=0.8",
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36u (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
				...BodyForm.getHeaders()
			}
		}).then(respon => {
			const $ = cheerio.load(respon.data)
			const result = {
				status: respon.status,
				result: {
					judul: $('div.zhay-middle.center').find('h1 > a').text().trim(),
					caption: $('div.zhay-middle.center').find("p:nth-child(2) > span").text().trim(),
					tanggal: $('div.zhay-middle.center > p:nth-child(3)').text().trim(),
					thumb: $("div.zhay-left.left").find('img').attr('src'),
					link1: 'https://snaptik.app' + $('div.zhay-right.is-desktop-only.right').find('div > a:nth-child(1)').attr('href'),
					link2: 'https://snaptik.app' + $('div.zhay-right.is-desktop-only.right').find('div > a:nth-child(2)').attr('href'),
					link3: 'https://snaptik.app' + $('div.zhay-right.is-desktop-only.right').find("div > a:nth-child(3)").attr('href')
				}
			}
			resolve(result)
		}).catch(reject)
	})
}
module.exports = { tktokdl2 }