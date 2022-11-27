// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm

// let users = [
//   {
//     id: '1',
//     username: 'bob',
//     password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
//     name: 'Bob',
//     email: 'bob@gmail.com',
//     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//   },
//   {
//     id: '2',
//     username: 'ellie',
//     password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
//     name: 'Ellie',
//     email: 'ellie@gmail.com',
//   },
// ];

// import { MongoClient } from 'mongodb';
// import { config } from '../config.js'

// const uri = config.db.host;

// const client = new MongoClient(uri);
// const database = client.db("Dwitter");
// const users = database.collection("users");

// import { getUsers } from "../db/database.js";
// import Mongodb from 'mongodb'

import mongoose, { Schema } from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  url: String,
})



useVirtualId(userSchema);

const User = mongoose.model("User", userSchema)

export async function findByUsername(username) {

  return User.findOne({ username })

  // return mapOptionalUser(await users
  //   .findOne({ username }))

  // return getUsers()
  //   .findOne({ username })
  //   .then(mapOptionalUser)

  // return await users.findOne({ username })

  // return users.find((user) => user.username === username);
}

export async function findById(id) {

  return User.findById(id)

  // return mapOptionalUser(await users
  //   .findById(id))

  // return getUsers()
  //   .findOne({ _id: new Mongodb.ObjectId(id) })
  //   .then(mapOptionalUser)

  // return await users.findById(id)

  // return users.find((user) => user.id === id);
}

export async function createUser(user) {

  return User.create(user).then(data => data.id)

  // return users
  //   .create(user)
  //   .then(data => {
  //     return data.id
  //   })

  // return getUsers()
  //   .insertOne(user)
  //   .then(data => data.insertedId.toString())

  // const newUser = await users.insertOne(user);
  // return newUser.id;

  // const created = { ...user, id: Date.now().toString() };
  // users.push(created);
  // return created.id;
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : null;
}