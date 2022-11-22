import { Router } from 'express';
import { body } from 'express-validator';
import * as tweetsController from '../controller/tweets.js'
import { expressValidator } from '../middleware/expressValidator.js';

const validateTweet = [
  body('text').trim().isLength({ min: 3 }).withMessage("최소 3 글자 이상이어야 합니다."),
  body("name").trim().notEmpty().withMessage("이름을 입력하세요."),
  body("username").trim().notEmpty().withMessage("닉네임을 입력하세요"),
  expressValidator
]

const tweetsRouter = Router();

tweetsRouter.get('/', tweetsController.readTweets)

tweetsRouter.get('/:id', tweetsController.readTweet)

tweetsRouter.post('/', validateTweet, tweetsController.createTweet)

tweetsRouter.put('/:id', validateTweet, tweetsController.updateTweet)

tweetsRouter.delete('/:id', tweetsController.deleteTweet)

export { tweetsRouter }