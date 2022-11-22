import express from 'express';
import fs, { readFileSync } from 'fs';
import fsAsync from 'fs/promises';
import { } from 'express-async-errors';

const app = express();

app.use(express.json());

// app.get('/file', (req, res) => {
//   fs.readFile('/file1.txt', (err, data) => {
//     if (err) {
//       res.sendStatus(404);
//     }
//   });
// });

app.get('/file1', (req, res, next) => {
  try {
    const data = fs.readFileSync('/file.txt');
  } catch (err) {
    res.status(404).send("File Not Found");
  }

  // fs.readFile('/file1.txt', (err, data) => {
  //   if (err) {
  //     res.status(404).send('File Not Found');
  //   }
  // })
});

app.get('/file2', (req, res, next) => {
  return fsAsync.readFile('/file.txt')
});

app.get('/file3', async (req, res) => {
  const data = await fsAsync.readFile('/file.txt')
});

app.use((error, req, res, next) => {
  console.error(error);
  const { statusCode = 500, message = 'Something went wrong' } = error;
  res.status(statusCode).json({ message });
});

app.listen(8080);
