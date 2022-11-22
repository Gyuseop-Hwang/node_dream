import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:8000",
  optionSuccessStatus: 200,
  credentials: true,
}

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(helmet())

app.get('/', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8000")
  // res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE")
  console.log(req.body);
  console.log(req.cookies);
  res.send("Welcome");
})

app.listen(8080);