// import mongodb from 'mongodb'
import { config } from '../config.js'
import mongoose, { Schema } from 'mongoose';

export async function mongooseConnect() {
  return mongoose.connect(config.db.host, { dbName: "dwitter" })
}

export const useVirtualId = (schema) => {
  schema.virtual("id").get(function () {
    return this._id.toString()
  })
  schema.set("toJSON", { virtuals: true });
  // schema.set("toObject", { virtuals: true });
}



// let db;
// export async function connenctDB() {
//   return mongodb.MongoClient.connect(config.db.host)
//     .then(client => {
//       db = client.db("dwitter");
//       // return client.db;
//     })
// }

// export function getUsers() {
//   return db.collection("users");
// }

// export function getTweets() {
//   return db.collection("tweets")
// }

// export function getUsers() {

  
// }