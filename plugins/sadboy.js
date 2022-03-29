let handler  = async (m, { conn, usedPrefix, command }) => {
  conn.sendBL(m.chat, `${pickRandom(global.sadboy)}`, wm, fla + `${command}`, [[`Sad Boy`, `${usedPrefix + command}`]], m)
}
handler.help = ['sadboy']
handler.tags = ['quotes']
handler.command = /^(sadboy)$/i

handler.limit = true

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.sadboy = [
  "Baikmu kepada semua orang sampai aku bingung dan merasa teristimewakan.",
  "Aku ingin menjadi satu satunya bintang yang kamu tatap.\nTapi aku sadar tidak ada bintang yang muncul sendirian.\nJadi sepertinya aku bukan yang satu satunya.",
  "Memilikimu adalah angan yang terlalu egois.\nTapi melupakanmu adalah ketidakmungkinan yang terlalu aku paksakan.",
  "Tidurlah . . .\nSepertinya kamu sudah lelah dikagumi banyak orang.\nSalah satunya adalah aku.",
  "Tolong jangan banyak berharap.\nAku tau aku butuh.\nTapi mungkin orang lain lebih layak untuk rasa ini.\n\nKita diciptakan untuk saling mengenal.\nTidak untuk memiliki.",
  "Kadang yang berjuang sampai tersungkur, tidak mendapatkan hasil.\nKadang yang berjuang sambil tertawa justru membuahkan semesta.",
  "Selamat pagi, malam.\nKabarku baik.\nDan sejauh ini tetap berusaha untuk baik baik saja.",
  "I'll stay, I’ll stay here all day.\nLooking at the sky with you.\nI’m your daydreaming boy, lilac blue.\n\nWere listening to lofi.\nSay goodbye to the stars.\nI'll get you the moon",
  "Aku ingin tangan untuk merangkul pundakku yang sayapnya sudah patah.\nMaaf, mulai hari ini terbangku tidak setinggi dulu.\nAku ingin tertidur nyenyak.\nAku ingin berbaring tanpa pikiran.",
  "Jika mendapatkanmu adalah angan, maka izinkan aku bercita cita selamanya.\nJika memilikimu adalah mimpi, maka izinkan aku tidur selamanya",
  "Maaf bintangku mulai redup.\nMungkin sebentar lagi ia padam.\nBintangku sudah kehilangan sumber cahaya nya.\nSaat ini ia sedang menikmati hari hari terakhir sinar redupnya sebelum padam seutuhnya.",
  "Begini, aku ingin mengatakan sesuatu, sesuatu yang mungkin akan membuatmu paham tentang aku, semoga.\n\nAku bukan orang yang akan mendikte Tuhan dengan mengeja namamu di setiap doaku.\nBukan, aku bukan orang seperti itu.\n\nAku bukan orang yang terpikat olehmu lantas menginginkanmu lebih dari apapun.\nBukan, lagi-lagi aku bukan orang seperti itu.",
  "Aku memikirkanmu, biarkan pikiranku saja yang seperti itu.\nAku terpikat olehmu, biarkan aku saja. Tanpa kuseret pakai doa, tanpa perlu kuamini sampai terijabah.",
  "Tentang kenapa aku masih bertahan.\nPadahal sebenarnya aku bisa dengan mudah meninggalkanmu.\nJawabannya sederhana, aku mencintaimu.\n\nTentang kenapa aku masih bisa percaya bahwa.\nSuatu saat nanti kau akan berubah.\nJawabannya juga masih sederhana, aku mencintaimu.\n\nYang rumit itu dirimu.\nYang tidak pernah mengerti akan hal itu",
  "Aku terlalu naif akan cintaku sampai aku tak sadar bahwa kau tak nyaman bersama cintaku.",
  "Saya akan tetap hidup dalam kemalangan.\nDimana tidak layak untuk memiliki.\nApalagi untuk memilih.",
  "Diri yang bodoh ini sudah habis jadi cacian semesta.\nMerenggut semua angan.\nBahkan anginpun bingung harus apa lagi yang di terbangkan.\nManusia ini sudah kehilangan mimpinya.",
  "Tolong jelaskan, dari sisi mana lagi saya harus tersenyum.\nBadainya terlalu kencang.\nJangkan tersenyum.\nMelihat diriku sendiri saja aku sulit.\nSaya ini kehilangan jiwanya.\nSaya kehilangan aku.",
  "Tanganku memang lelah.\nPundakku memang payah.\nMataku memang selalu basah.\nPantas kok untuk selalu di tiadakan.",
  "Silahkan menghilang.\nMereka tidak butuh aku.\nMungkin ruang gelap dan udara malam baik untukku saat ini.\nIsi kepalagu ramai, namun yang kugenggam hanya kesendirian.",
  "Kepada tiap tiap hati yang sedang lelah.\nDan juga untuk setiap bahu yang sudah lelah berpura pura tegar.\nJuga air mata yang butuh sandaran.\n\nMungkin hari ini pergiku tidak dicari.\nBahkan kepulanganku tidak di harapkan.\n\nAkulah manusia paling malam.\nAku adalah manusia yang tidak dianggap manusia.",
  "Aku ingin tangan untuk merangkul pundakku yang sayapnya sudah patah.\nMaaf, mulai hari ini terbangku tidak setinggi dulu.\nAku ingin tertidur nyenyak.\nAku ingin berbaring tanpa pikiran.",
  "Ingin melepaskan tapi baru sadar, memilikinya pun tidak pernah.",
  "Jika tidak denganmu, maka tidak dengan siapapun.",
  "Karena di mimpiku selalu ada kamu dan itu terlalu indah dan egois untuk ku nikmati.\nMungkin tanpa tidur akan membuatku lebih sadar akan kenyataan.",
  "Bermimpilah dengan tenang, tak apa tanpamu malam ini.\nLagipula aku cukup puas dengan tatapan sang bulan.\nJikapun esok malam tanpamu lagi, aku percaya sang bulan tetap ingin menatapku.",
  "Masih kurangkah telinga ini mendengar keluh kesahmu?\nBelum cukupkah waktuku untuk membalas segala aduanmu?\nJika aku yang kau rasa menenangkanmu, lantas mengapa ia yang menenangkanmu?\n\nSiapa gerangan dirinya?\nDari mana datangnya?\nMengapa aku tidak melihatnya datang?",
  "Memilikimu adalah angan yang terlalu egois, melupakanmu adalah ketidakmungkinan yang selalu aku paksakan.",
  "Mentari kini hitam legam.\nSepekat perih yang kutelan.\nDalam sesak hatiku slalu bertanya.\nMasihkah ia mengingatku.\n\nSaat ia sendiri.\nAtau saat dalam dekap mesra kekasihnya.",
  "Pekik hati makin lantang.\nPertahan mulut yang terbungkam.\nLantunkan bait bait pahit yang letihkan hati.",
  "Inginku salahkan waktu, yang menuntunku mengenalnya.\nTinggalkan jejak sakitnya hingga bermalam-malam.",
  "Aku berhenti untuk kamu, namun nyatanya masih ku langitkan segala panjat untukmu.\nJangan kan orangtua ku, tuhan saja ku rayu.\nSekarang kau abadi dalam karya pada rindu yang berniskala.\n\nJika kau mencariku, aku masih disini seperti dulu.\nSemoga segala urusmu dimudahkan.",
  "Setelah bulan ke 4 setelah tahun yang kelam.\nInilah aku si korban dari badai kencangmu tahun lalu.\nTubuhnya penuh luka, lebamnya tidak karuan.\nAku sudah kehilangan banyak waktu untuk bahagia.",
  "Aku ini manusia paling bodoh perihal menutupi rasa.\nAku terlalu tidak ada apa-apanya untuk kamu yang memiliki segalanya.\nMaaf, Rasa ini terlalu lancang.",
  "Mencintaimu adalah candu, namun memilikimu adalah egois yang terlalu kupaksakan.\nTerlalu banyak yang mengagumimu, sampai sampai menghalumu saja aku merasa tak pantas.",
  "Aku tidak akan menangis jika suatu hari nanti kamu bertemu dengan seseorang yang memang sudah semestinya berada di sampingmu.\nMungkin aku akan jauh lebih bahagia.\nKarena akhirnya seseorang itu bukan aku.\nKarena aku tau, aku tidak pantas untuk menjadi yang selamanya.",
  "Andai april punya telinga, aku ingin bilang 'Hei, aku lelah dengan semuanya' !",
  "Aku hanya lah satu dari ribuan pengagum mu.\nAku yang jatuh cinta dengan baris baris diksi yng kau punya.\n\nKadang aku bertanya tanya.\nSiapa gerangan sosok yang selalu kau puja di setiap sajak yang kau punya.\nBolehkah aku mngatakan bhwa aku cemburu ??\nPadahal kau mngenal aku saja tidak.",
  "Izin menyerah untuk hari ini karena kemarin semuanya sedang tidak ramah.\nIngin tersenyum malah diberi patah, ingin berjuang malah dipaksa untuk pulang.\nDan ketika pulang pun aku ternyata sudah kehilangan rumah.",
  "Apa kabar senjaku?\nKali ini tulisanku tentang kamu",
  "Kenalin, aku ini pengagum senjamu yang paling dekat.\nKamu nggak tahu kan selama ini aku menyimpan rasa yang terlalu dalam, untuk kamu yang terlalu tidak mungkin.\nAtau mungkin kamu sudah tahu, tapi kamu sedang pura-pura tidak tahu agar aku tidak begitu sakit.\nTerserah bagaimana angin membawanya saja ya.",
  "Aku ini manusia paling bodoh perihal menutupi rasa.\nAku terlalu tidak ada apa-apanya untuk kamu yang memiliki segalanya.\nMaaf, Rasa ini terlalu lancang.",
  "Aku ingin dibutuhkan setiap kali kamu butuh seseorang.\nAku ingin dilihat setiap kali kamu ingin melihat seseorang.\nAku ingin menjadi satu-satunya bintang yang kamu tatap, tapi aku sadar tidak ada bintang yang muncul sendirian.\nJadi sepertinya aku bukan yang satu-satunya, mungkin aku hanya satu di antaranya.",
  "Baikmu terlalu ke semua orang, sampai-sampai semua orang bingung dan merasa teristimewakan.\nItu bukan salahmu, akunya aja yang terlalu banyak mau.",
  "Memilikimu adalah angan yang terlalu egois, melupakanmu adalah ketidakmungkinan yang selalu aku paksakan.",
  "Semuanya ada di kamu\nTerserah bagaimana baiknya saja\nYang jelas aku tidak mungkin mulai duluan, karena aku tahu diri\nAku bukan siapa-siapa\nAku juga tidak layak menjadi siapa-siapa",
  "Kenapa sih harus serumit ini?\nHati selalu bilang, ‘Aku mau kamu’\nTapi kadang logika menjawab,\n‘Hhh jangan bodoh’.\nSiapa juga yang mau dengan aku yang payah ini, mudah rapuh, mudah rindu, bahkan mudah jatuh.\nContohnya kali ini, sudah jatuh terlalu dalam, lalu rindu yang paling lancang.",
  "Senjamu layak untuk dirindukan, kamu hangat. Tapi sayangnya ke semua orang.\nEgois nggak sih kalau senjanya aku bawa pulang, biar bisa ku tatap sendirian.\nSoalnya aku sudah lelah menjadi pengagummu yang kesekian.\nBolehkah aku jadi pengagum terdekat dan hanya satu-satunya?\nHei, tidak mungkin.",
  "Lupakan ya, anggap saja aku bercanda perihal langitmu tadi.\nMaaf, bintangku terlalu redup.\nKarena setiap malam selalu mendung\nTerima kasih ya senjanya\nKalau malam ini bintangku tidak muncul lagi, itu tandanya malam ini akan turun hujan.\nHujan berkepanjangan dari mata seseorang, Yang mungkin itu aku."
]
