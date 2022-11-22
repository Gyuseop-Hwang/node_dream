import jwt from 'jsonwebtoken';
import { LoginRequired } from '../utils/errors.js'
import * as authRepository from '../data/auth.js'
const jwtKey = process.env.JWTKEY || "jwtSecret";

const isAuth = (req, res, next) => {

  const authHeader = req.get("Authorization");

  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return next(new LoginRequired())
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, jwtKey, async (err, decode) => {

    if (err) {
      return next(new LoginRequired())
    }
    const user = await authRepository.findById(decode.id)

    if (!user) {
      return next(new LoginRequired())
    }

    req.userId = user.id;
    return next()
  })

}

export { isAuth };