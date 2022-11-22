import { validationResult } from 'express-validator';

function expressValidator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array().map(error => error.msg).join(" ") })
  }
  next();
}

export { expressValidator };