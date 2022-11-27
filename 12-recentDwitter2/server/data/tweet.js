import * as userRepository from './auth.js';
import { useVirtualId } from '../db/database.js';
import mongoose, { Schema } from 'mongoose'

// let tweets = [
//   {
//     id: '1',
//     text: '드림코더분들 화이팅!',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
//   {
//     id: '2',
//     text: '안뇽!',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
// ];

// import { getTweets } from "../db/database.js"
// import { ObjectId } from 'mongodb'

const tweetSchema = new Schema({
  text: { type: String, requried: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, requied: true },
  url: String
}, {
  timestamps: true
})

useVirtualId(tweetSchema)

const Tweet = mongoose.model('tweets', tweetSchema);


export async function getAll() {

  return Tweet.find().sort({ createdAt: -1 })

  // return await getTweets()
  //   .find()
  //   .sort({ createdAt: -1 })
  //   .toArray();

  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, url } = await userRepository.findById(
  //       tweet.userId
  //     );
  //     return { ...tweet, username, name, url };
  //   })
  // );
}

export async function getAllByUsername(username) {

  return Tweet.find({ username }).sort({ createdAt: -1 })

  // return mapTweets(await getTweets()
  //   .find({ username })
  //   .sort({ createdAt: -1 })
  //   .toArray());

  // return getAll().then((tweets) =>
  //   tweets.filter((tweet) => tweet.username === username)
  // );
}

export async function getById(id) {

  return Tweet.findById(id)

  // return mapOptionalTweet(await getTweets()
  //   .findOne({ _id: new ObjectId(id) }));

  // const found = tweets.find((tweet) => tweet.id === id);
  // if (!found) {
  //   return null;
  // }
  // const { username, name, url } = await userRepository.findById(found.userId);
  // return { ...found, username, name, url };
}

export async function create(text, userId) {

  const { name, username, url } = await userRepository.findById(userId);

  return Tweet.create({ text, userId, name, username, url })

  // const tweet = {
  //   text,
  //   createdAt: new Date(),
  //   userId,
  //   name,
  //   username,
  //   url
  // }

  // return getTweets()
  //   .insertOne(tweet)
  //   .then(data => {
  //     // return getById(data.insertedId.toString())
  //     return mapOptionalTweet({ ...tweet, _id: data.insertedId })
  //   })

  // return getUsers()
  //   .findOne({ _id: ObjectId(userId) })
  //   .then(user => {
  //     const { username, name, email } = user;
  //     return getTweets()
  //       .insertOne({ text, username, name, email })
  //       .then(data => getById(data.insertedId.toString()))
  //   })

  // const tweet = {
  //   id: new Date().toString(),
  //   text,
  //   createdAt: new Date(),
  //   userId,
  // };
  // tweets = [tweet, ...tweets];
  // return getById(tweet.id);
}

export async function update(id, text) {

  return Tweet.findByIdAndUpdate(id, { text }, { new: true })

  // return getTweets()
  //   .findOneAndUpdate(
  //     { _id: new ObjectId(id) },
  //     { $set: { text } },
  //     { returnDocument: "after" }
  //   )
  //   .then(result => result.value)
  //   .then(mapOptionalTweet)

  // return getTweets()
  //   .UpdateOne({ _id: ObjectId(id) }, { text })
  //   .then(data => {
  //     return getById(data.insertId.toString())
  //   })


  // const tweet = tweets.find((tweet) => tweet.id === id);
  // if (tweet) {
  //   tweet.text = text;
  // }
  // return getById(tweet.id);
}

export async function remove(id) {

  await Tweet.findByIdAndDelete(id);
  // getTweets()
  //   .deleteOne({ _id: new ObjectId(id) })

  // tweets = tweets.filter((tweet) => tweet.id !== id);
}

function mapOptionalTweet(tweet) {

  return tweet ? { ...tweet, id: tweet._id.toString() } : null;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet)
}