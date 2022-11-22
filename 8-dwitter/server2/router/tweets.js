import { Router } from 'express';
import tweetsController from '../controller/tweets.js'

const tweetsRouter = Router();

tweetsRouter.get('/', tweetsController.readTweets)

tweetsRouter.get('/:id', tweetsController.readTweetById)

tweetsRouter.post('/', tweetsController.createTweet)

tweetsRouter.put('/:id', tweetsController.updateTweet)

tweetsRouter.delete('/:id', tweetsController.destroyTweet)

export { tweetsRouter }