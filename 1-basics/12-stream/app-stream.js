const fs = require('fs');
const data = [];


const beforeMem = process.memoryUsage().rss;

fs.createReadStream("./file.txt", {
  // highWaterMark: 8,
  // encoding: 'utf-8'
})
  .on('data', chunk => {
    // console.log(chunk)
    data.push(chunk);
    console.count("data");
  })
  .on("end", () => {
    console.log(data.join(""));
    const afterMem = process.memoryUsage().rss;
    const diff = afterMem - beforeMem;
    const consumed = diff / 1024 / 1024;
    console.log(diff);
    console.log(`Consumed Memory: ${consumed}MB`);
  })
  .on("error", error => {
    console.log(error)
  })
