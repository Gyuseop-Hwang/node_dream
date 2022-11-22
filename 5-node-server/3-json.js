const http = require('http');
const ejs = require('ejs');
const { builtinModules } = require('module');


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
  const method = req.method;
  res.setHeader('Content-Type', "application/json")

  if (url === '/courses') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-Type': "application/json" })
      res.end(JSON.stringify(courses))
    }
    else if (method === 'POST') {
      const body = [];
      req.on('data', chunk => {
        body.push(chunk);
        console.log(chunk);
      })
      req.on('end', () => {
        // const course = JSON.parse(body.join(""))
        const course = JSON.parse(Buffer.concat(body).toString())
        courses.push(course);
        console.log(course);
        res.writeHead(201);
        res.end();
      })
    }
  }
});

server.listen(8080)