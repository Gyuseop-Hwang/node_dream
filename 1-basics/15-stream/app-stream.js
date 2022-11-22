const fs = require('fs');
const data = [];
fs.createReadStream('./file.txt', {
  highWaterMark: 8,
  // encoding: "utf-8"
})
  .once('data', chunk => {
    // console.log(chunk)
    data.push(chunk)
    console.count('data')
  })
  .on("end", () => {
    console.log(Buffer.concat(data).toString())
  })
  .on('error', (err) => {
    console.log(err);
  })