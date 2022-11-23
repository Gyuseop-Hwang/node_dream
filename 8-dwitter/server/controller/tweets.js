import { IDNotFound, UserNotFound, AuthError } from '../utils/errors.js'
import * as tweetRepository from '../data/tweets.js'

export const readTweets = async (req, res, next) => {

  const username = req.query.username
  const tweets = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll());

  // if (tweets.length === 0) {
  //   return next(new UserNotFound(username));
  // }

  return res.status(200).json(tweets);
}

export const readTweet = async (req, res, next) => {
  const id = req.params.id;

  const foundTweet = await tweetRepository.getById(id)

  if (!foundTweet) {
    return next(new IDNotFound(id))
  }

  res.status(200).json(foundTweet)
}

export const createTweet = async (req, res, next) => {
  const { text } = req.body;

  const newTweet = await tweetRepository.create(text, req.userId)

  // tweets.unshift(newTweet);

  // res.status(201).send("tweet was posted")
  res.status(201).json(newTweet);
}

export const updateTweet = async (req, res, next) => {

  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.getById(id)

  // const tweet = await tweetRepository.update(id, text)

  if (!tweet) {
    return next(new IDNotFound(id))
  }

  if (tweet.userId !== req.userId) {
    return next(new AuthError())
  }

  const updated = await tweetRepository.update(id, text)

  // res.status(201).send("tweet was updated")
  res.status(200).json(updated)
}

export const deleteTweet = async (req, res, next) => {

  const id = req.params.id;

  const tweet = await tweetRepository.getById(id)

  if (!tweet) {
    return next(new IDNotFound(id))
  }

  if (tweet.userId !== req.userId) {
    return next(new AuthError())
  }

  await tweetRepository.deleteById(id);

  // if (tweetIndex < 0) {
  //   return next(new IDNotFound(req.params.id))
  // }

  // const tweets = await tweetRepository.getAll()

  // if (tweets[tweetIndex].userId !== req.userId) {
  //   return next(new AuthError())
  // }

  // res.status(204).json({ message: "tweet was deleted" })
  res.sendStatus(204)
}

// export default {
//   readTweets,
//   readTweet,
//   createTweet,
//   updateTweet,
//   deleteTweet
// }