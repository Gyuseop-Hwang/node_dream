const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./file.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./file4.zip');

readStream.pipe(zlibStream).pipe(writeStream)
  .on("finish", () => {
    console.log('done!')
  })