const axios = require('axios')
const cheerio = require('cheerio')

async function spekhp(query) {
    try {
        const response = await axios.get(`https://carisinyal.com/hp/?_sf_s=${encodeURIComponent(query)}`);
        const $ = cheerio.load(response.data);
        const list = $("div.oxy-posts > div.oxy-post");
        const results = [];

        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            const title = $(element).find("a.oxy-post-title").text();
            const harga = $(element).find("div.harga").text();
            const link = $(element).find("a.oxy-post-image").attr('href');

            const fullSpecs = await speklengkap(link);  // Call speklengkap to get full specifications

            results.push({
                title: title,
                harga: harga,
                link: link,
                ...fullSpecs
            });
        }

        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function speklengkap(link) {
    try {
        const response = await axios.get(link);
        const $ = cheerio.load(response.data);
        const fitur = [];
        const spesifikasi = [];

        const list = $("div#_dynamic_list-777-114924 > div.ct-div-block");
        list.each((index, element) => {
            const fitur_unggulan = $(element).find("span.ct-span").text();
            fitur.push({
                desc: fitur_unggulan
            });
        });

        const spek = $("div.ct-code-block > div > table.box-info");
        spek.each((index, element) => {
            const name = $(element).find("tr.box-baris > td.kolom-satu").text().trim();
            const fitur = $(element).find("tr.box-baris > td.kolom-dua").text().trim();
            spesifikasi.push({
                name: name,
                fitur: fitur
            });
        });

        const img = $("meta[name='twitter:image']").attr('content');

        return {
            fitur: fitur,
            spek: spesifikasi,
            img: img
        };
    } catch (error) {
        console.error('Error fetching full specifications:', error);
        throw error;
    }
}

module.exports = { spekhp, speklengkap };
