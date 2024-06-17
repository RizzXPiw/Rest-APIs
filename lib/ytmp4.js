const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

async function downloadYouTubeVideo(url, outputDir = '.') {
    try {
        // Mendapatkan info video
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '_'); // Menghapus karakter spesial dari judul

        // Tentukan jalur output dan nama file
        const outputPath = path.join(outputDir, `${sanitizedTitle}.mp4`);

        // Membuat stream unduhan
        const videoStream = ytdl(url, { format: 'mp4' });
        const fileStream = fs.createWriteStream(outputPath);

        // Menghubungkan stream unduhan ke file output
        videoStream.pipe(fileStream);

        // Event listener untuk selesai unduh
        fileStream.on('finish', () => {
            console.log(`Download completed: ${outputPath}`);
        });

        // Event listener untuk error
        fileStream.on('error', (err) => {
            console.error(`Error occurred while downloading: ${err.message}`);
        });

    } catch (err) {
        console.error(`Failed to download video: ${err.message}`);
    }
}

module.exports = { downloadYouTubeVideo }
