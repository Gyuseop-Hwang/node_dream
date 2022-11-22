import express from 'express';
// import Router from './router/index.js'
import { postRouter, userRouter } from './router/index.js'

const app = express();

app.use(express.json()); // REST API -> Body
app.use(express.urlencoded({ extended: false })) // HTML Form -> Body
app.use(express.static("public"))

// app.use("/posts", Router.postRouter);
// app.use("/users", Router.userRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);


app.listen(8080);
