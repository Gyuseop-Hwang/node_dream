import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignupError, LoginError } from "../utils/errors.js";
import * as authRepository from '../data/auth.js'
import { config } from '../utils/index.js'

export const signup = async (req, res, next) => {

  const { username, password, name, email, url } = req.body;

  const userInfo = await authRepository.findByUsername(username);

  if (userInfo) {
    return next(new SignupError());
  }

  const hashedPassword = await bcrypt.hash(password, config.bcrypt.bcryptSaltRounds);

  const userId = await authRepository.createUser({
    username,
    password: hashedPassword,
    name,
    email,
    url
  })

  const token = createToken(userId)

  res.status(201).json({ token, username })
}

export const login = async (req, res, next) => {

  const { username, password } = req.body;

  const userInfo = await authRepository.findByUsername(username);

  if (!userInfo) {
    return next(new LoginError())
  }

  const result = await bcrypt.compare(password, userInfo.password);

  if (!result) {
    return next(new LoginError());
  }

  const token = createToken(userInfo.id);
  return res.status(200).json({ token, username });
}

function createToken(id) {
  return jwt.sign({ id }, config.jwt.jwtSecret, { expiresIn: config.jwt.jwtExpiresInSec })
}

export const me = async (req, res, next) => {

  const user = await authRepository.findById(req.userId)

  res.status(200).json({ username: user.username })
}