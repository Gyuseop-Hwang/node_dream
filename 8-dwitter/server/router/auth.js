import { Router } from "express";
import * as authController from "../controller/auth.js";
import { validateSignup, validateLogin } from '../middleware/expressValidator.js'
import { isAuth } from '../middleware/auth.js'

const authRouter = Router();

authRouter.post("/signup", validateSignup, authController.signup)

authRouter.post("/login", validateLogin, authController.login)

authRouter.get('/me', isAuth, authController.me)


export { authRouter }