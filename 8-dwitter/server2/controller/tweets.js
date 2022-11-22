import { IDNotFound, UserNotFound } from '../utils/errors.js'

import tweets from '../data/tweets.js'

const readTweets = (req, res, next) => {

  const username = req.query.username
  if (username) {
    // const foundTweet = tweets.find(tweet => tweet.username === username);
    const foundTweets = tweets.filter(tweet => tweet.username === username);

    if (foundTweets.length === 0) {
      return next(new UserNotFound(username));
    }

    return res.status(200).json(foundTweets);
  }

  res.status(200).json(tweets)
}

const readTweetById = (req, res, next) => {
  const foundTweet = tweets.find(tweet => tweet.id === req.params.id);

  if (!foundTweet) {
    return next(new IDNotFound(req.params.id))
  }

  res.status(200).json(foundTweet)
}

const createTweet = (req, res, next) => {
  const { text, name, username } = req.body;

  const newTweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username
  }

  // tweets.unshift(newTweet);
  tweets = [newTweet, ...tweets];
  // res.status(201).send("tweet was posted")
  res.status(201).json(newTweet);
}

const updateTweet = (req, res, next) => {
  const foundTweet = tweets.find(tweet => tweet.id === req.params.id);

  if (!foundTweet) {
    return next(new IDNotFound(req.params.id))
  }

  foundTweet.text = req.body.text;

  // res.status(201).send("tweet was updated")
  res.status(200).json(foundTweet)
}

const destroyTweet = (req, res, next) => {
  const tweetIndex = tweets.findIndex(tweet => tweet.id === req.params.id);

  if (tweetIndex < 0) {
    return next(new IDNotFound(req.params.id))
  }

  tweets.splice(tweetIndex, 1);

  // res.status(204).json({ message: "tweet was deleted" })
  res.sendStatus(204)
}

export default {
  readTweets,
  readTweetById,
  createTweet,
  updateTweet,
  destroyTweet
}