const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function sfileSearch(query, page = 1) {
    try {
        let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`);
        let $ = cheerio.load(await res.text());
        let result = [];
        
        $('div.list').each(function () {
            let title = $(this).find('a').text();
            let size = $(this).text().trim().split('(')[1];
            let link = $(this).find('a').attr('href');
            if (link) result.push({ title, size: size.replace(')', ''), link });
        });
        
        return result;
    } catch (error) {
        console.error('Error fetching Sfile search results:', error);
        return [];
    }
}

async function sfileDl(url) {
	let res = await fetch(url)
	let $ = cheerio.load(await res.text())
	let filename = $('div.w3-row-padding').find('img').attr('alt')
	let mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
	let filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
	let download = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
	return { filename, filesize, mimetype, download }
}

module.exports = { sfileSearch, sfileDl };
