// const express = require('express');
import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import { tweetsRouter, authRouter } from './router/index.js'
import errorController from './controller/errors.js'
import { config } from './utils/index.js';
import { Server } from 'socket.io'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use('/tweets', tweetsRouter);
app.use("/auth", authRouter)

app.use(errorController.pageNotFound)

app.use(errorController.mainError)

const port = config.server.PORT

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

const socketIO = new Server(server, {
  cors: {
    origin: "*"
  }
})

socketIO.on("connection", (socket) => {
  console.log("Client here")
  // socketIO.emit("dwitter", "Hello")
  // socketIO.emit("dwitter", "Hello")
})

// setInterval(() => {
//   socketIO.emit("dwitter", "hello")
// }, 1000)