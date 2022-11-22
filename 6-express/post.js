import express from 'express';

const app = express();

app.use(express.json());

app.post("/", (req, res, next) => {
  console.log(req.body);
  res.sendStatus(201);
})

app.listen(8080, () => {
  console.log("listening on port 8080")
})