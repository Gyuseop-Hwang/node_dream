import { Router } from 'express';
import * as tweetsController from '../controller/tweets.js'
import { validateTweet } from '../middleware/expressValidator.js';
import { isAuth } from '../middleware/auth.js'


const tweetsRouter = Router();

tweetsRouter.get('/', isAuth, tweetsController.readTweets)

tweetsRouter.get('/:id', isAuth, tweetsController.readTweet)

tweetsRouter.post('/', isAuth, validateTweet, tweetsController.createTweet)

tweetsRouter.put('/:id', isAuth, validateTweet, tweetsController.updateTweet)

tweetsRouter.delete('/:id', isAuth, tweetsController.deleteTweet)

export { tweetsRouter }