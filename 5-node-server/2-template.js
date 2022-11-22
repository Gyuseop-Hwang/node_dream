const http = require('http');
const ejs = require('ejs');

const name = "gyuseop";

const courses = [
  { name: "HTML" },
  { name: "CSS" },
  { name: 'JAVASCRIPT' },
  { name: 'NODE' },
  { name: "SQL" },
  { name: "TYPESCRIPT" }
]
const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader('Content-Type', "text/html")
  // const data = [];
  if (url === '/') {

    // fs.createReadStream("./html/welcome.html").pipe(res);
    ejs.renderFile('./template/welcome.ejs', { name }).then(data => {
      // res.write(data)
      res.end(data)
    })
  }
  else if (url === '/courses') {

    ejs.renderFile('./template/courses.ejs', { courses }).then(data => {
      res.end(data)
    })
  }
  else {

    ejs.renderFile('./template/notfound.ejs', { name }).then(data => {
      // res.write(data)
      res.end(data)
    })
  }
});

server.listen(8080)