import express from 'express';
import { body, param, validationResult } from 'express-validator'

const app = express();
app.use(express.json());

// {
//   "name" : "E1",
//   "age" : 1,
//   "job" : {
//     "name" : "DB Academy",
//     "title" : "Instructor"
//   },
//   "email" : "ellie@server.com"
// }

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map(error => error.msg).join(" ") })
  }
  next();
}

app.post('/users',
  [
    body('name')
      // .notEmpty().withMessage("이름은 비울 수 없습니다.")
      .trim().isLength({ min: 2 }).withMessage("최소 2글자 이상이어야 합니다."),
    body('age')
      // .notEmpty().withMessage("나이는 비울 수 없습니다.")
      .isInt().withMessage("숫자를 입력하세요"),
    body("email").isEmail().withMessage("올바른 형태의 이메일을 입력하세요").normalizeEmail(),
    body("job.name").notEmpty().withMessage("직업을 입력하세요."),
    body('job.title').notEmpty().withMessage("직함을 입력하세요."),
    validate
  ],
  (req, res, next) => {

    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  '/:email',
  [
    param('email').isEmail().withMessage("올바른 형태의 이메일을 입력하세요."),
    validate
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array().map(error => error.msg).join(" ") })
    }
    res.send('💌');
  }
);

app.listen(8080);
