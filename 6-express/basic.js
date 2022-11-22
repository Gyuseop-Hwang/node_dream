import express from 'express';

const app = express();


// app.get('/sky/:id', (req, res, next) => {
//   // console.log(req.path);
//   // console.log(req.headers);
//   console.log(req.params.id);
//   console.log(req.query.keyword)

//   // res.send("get");
//   // res.json({ name: "ellie" })
//   // res.sendStatus(401);
//   res.setHeader("key", "value")
//   res.status(201).send("created")
// })

app.all("/api", (req, res, next) => {
  console.log("all");
  next();
})

// app.all("/api/*", (req, res, next) => {
//   console.log("all");
//   next();
// })

app.use("/sky", (req, res, next) => {
  console.log("use");
  next()
})

app.get('/',
  (req, res, next) => {
    console.log("first")
    next(new Error('error'));
    // next('router');
  },
  (req, res, next) => {
    console.log("first2")
    next();
  }
)

app.get('/',
  (req, res, next) => {
    console.log("second")
    res.send("last")
  }
)


app.use((req, res, next) => {
  res.status(404).send('Not found');
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry, try later!")
})



app.listen(8080, () => {
  console.log("listning on port 8080")
})