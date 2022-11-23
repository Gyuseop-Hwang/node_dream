import jwt from 'jsonwebtoken';
import { LoginRequired } from '../utils/errors.js'
import * as authRepository from '../data/auth.js'
import { config } from '../utils/index.js'

const isAuth = (req, res, next) => {

  const authHeader = req.get("Authorization");

  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return next(new LoginRequired())
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt.jwtSecret, async (err, decode) => {

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