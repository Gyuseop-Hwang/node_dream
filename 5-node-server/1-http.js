const http = require('http');
// const http2 = require('http2');

// console.log(http.STATUS_CODES);
// console.log(http.METHODS);
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader('Content-Type', "text/html")
  // const data = [];
  console.log(req);
  if (url === '/') {
    // fs.createReadStream('./html/welcome.html')
    //   .on("data", chunk => {
    //     data.push(chunk);
    //   })
    //   .on('end', () => {
    //     res.write(data.join(""));
    //     res.end();
    //   })
    fs.createReadStream("./html/welcome.html").pipe(res);
  }
  else if (url === '/courses') {
    // fs.createReadStream('./html/courses.html')
    //   .on("data", chunk => {
    //     data.push(chunk);
    //   })
    //   .on('end', () => {
    //     res.write(data.join(""));
    //     res.end();
    //   })
    fs.createReadStream("./html/courses.html").pipe(res);
  }
  else {
    // fs.createReadStream('./html/notfound.html')
    //   .on("data", chunk => {
    //     data.push(chunk);
    //   })
    //   .on('end', () => {
    //     res.write(data.join(""));
    //     res.end();
    //   })
    fs.createReadStream("./html/notfound.html").pipe(res);
  }
});

server.listen(8080)