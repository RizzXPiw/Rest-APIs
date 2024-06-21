const axios = require('axios');
const cheerio = require('cheerio');

const bingimg = async (q) => {
    try {
        const response = await axios.get(`https://www.bing.com/images/search?q=${encodeURIComponent(q)}&qft=+filterui:photo-photo&FORM=IRFLTR`);
        const $ = cheerio.load(response.data);
        let imageUrls = [];

        $('a.iusc').each((i, element) => {
            const metadata = $(element).attr('m');
            const mObj = JSON.parse(metadata);
            if (mObj && mObj.murl) {
                imageUrls.push(mObj.murl);
            }
        });

        // Hanya ambil 10 gambar pertama untuk contoh
        imageUrls = imageUrls.slice(0, 10);

        console.log('URL Gambar HD:');
        imageUrls.forEach((url, index) => {
            console.log(`Result ${index + 1}: ${url}`);
        });

        return imageUrls;
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil gambar:', error);
        return [];
    }
}

module.exports = { bingimg };
