import { body, validationResult } from 'express-validator';

function expressValidator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map(error => error.msg).join(" ") })
  }
  next();
}

const validateTweet = [
  body('text').trim().isLength({ min: 3 }).withMessage("최소 3 글자 이상이어야 합니다."),
  // body("name").trim().notEmpty().withMessage("이름을 입력하세요."),
  // body("username").trim().notEmpty().withMessage("닉네임을 입력하세요"),
  expressValidator
]

// const validateUpdateTweet = [
//   body('text').trim().isLength({ min: 3 }).withMessage("최소 3 글자 이상이어야 합니다."),
//   expressValidator
// ]

const validateLogin = [
  body("username").trim().isAlphanumeric().withMessage("password에 특수문자는 사용할 수 없습니다.")
    .isLength({ min: 5 }).withMessage("username은 최소 5글자 이상이어야 합니다."),
  body("password").trim().isAlphanumeric().withMessage("password에 특수문자는 사용할 수 없습니다.")
    .isLength({ min: 5 }).withMessage("password는 최소 5글자 이상이어야 합니다."),
  expressValidator
]

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name은 빈 값이 허용되지 않습니다."),
  body("email").trim().isEmail().withMessage("올바른 이메일을 입력하세요.").normalizeEmail(),
  body("url").trim().isURL().withMessage("올바른 url을 입력하세요.").optional({ nullable: true, checkFalsy: true }),
  expressValidator
]

export {
  validateTweet,
  validateSignup,
  validateLogin
};