// const express = require('express');
import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import { tweetsRouter, authRouter } from './router/index.js'
import errorController from './controller/errors.js'

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

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})