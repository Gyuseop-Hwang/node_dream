// import * as userRepository from './auth.js';
// import { db } from '../db/database.js'
// import { sequelize } from '../db/database.js'
// import SQ from 'sequelize';
// import { User } from './auth.js'

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

// const SELECT_JOIN = "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw INNER JOIN users as us ON tw.userId = us.id"

// const ORDER_DESC = "ORDER BY tw.createdAt DESC"

// const DataTypes = SQ.DataTypes;
// const Sequelize = SQ.Sequelize;

// const Tweet = sequelize.define("tweet", {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   text: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   }
// })

// Tweet.belongsTo(User)

// const INCLUDE_USER = {
  // attributes: [
  //   "id",
  //   "text",
  //   "createdAt",
  //   "userId",
  //   [Sequelize.col("user.name"), "name"],
  //   [Sequelize.col("user.username"), "username"],
  //   [Sequelize.col("user.url"), "url"],
  // ],
//   include: [{
//     model: User/*, attributes: []/*attributes: ["name", "username", "url"]*/
//   }]

// }

// const ORDER_DESC = {
//   order: [["createdAt", "DESC"]]
// }

// export async function getAll() {

//   return await Tweet.findAll({
//     ...INCLUDE_USER,
//     ...ORDER_DESC
//   })

  // const query = `${SELECT_JOIN} ${ORDER_DESC}`

  // return db.execute(query).then(result => {
  //   return result[0];
  // })

  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, url } = await userRepository.findById(
  //       tweet.userId
  //     );
  //     return { ...tweet, username, name, url };
  //   })
  // );
// }

// export async function getAllByUsername(username) {

//   return await Tweet.findAll({
//     ...INCLUDE_USER,
//     ...ORDER_DESC,
//     include: {
//       ...INCLUDE_USER.include[0],
//       where: { username }
//     }
//   })


  // const query = `${SELECT_JOIN} WHERE us.username = ? ${ORDER_DESC}`

  // return db.execute(query, [username]).then(result => {
  //   return result[0];
  // })

  // return getAll().then((tweets) =>
  //   tweets.filter((tweet) => tweet.username === username)
  // );
// }

// export async function getById(id) {

//   return await Tweet.findOne({
//     where: { id },
//     ...INCLUDE_USER
//   })

  // const query = `${SELECT_JOIN} WHERE tw.id = ? ${ORDER_DESC}`

  // return db.execute(query, [id]).then(result => {
  //   return result[0][0];
  // })


  // const found = tweets.find((tweet) => tweet.id === id);
  // if (!found) {
  //   return null;
  // }
  // const { username, name, url } = await userRepository.findById(found.userId);
  // return { ...found, username, name, url };
// }

// export async function create(text, userId) {

//   return Tweet.create({ text, userId }).then(data => {
//     return getById(data.dataValues.id)
//   })

  // const query = "INSERT INTO tweets (text, createdAt, userId) VALUES(?, ?, ?)"
  // return db.execute(query, [
  //   text,
  //   new Date(),
  //   userId
  // ]).then(result => {
  //   return getById(result[0].insertId);
  // })


  // const tweet = {
  //   id: new Date().toString(),
  //   text,
  //   createdAt: new Date(),
  //   userId,
  // };
  // tweets = [tweet, ...tweets];
  // return getById(tweet.id);
// }

// export async function update(id, text) {


//   return Tweet.findByPk(id, INCLUDE_USER).then(tweet => {
//     tweet.text = text;
//     return tweet.save()
//   })

  // const query = `UPDATE tweets SET text = ? WHERE id = ?`

  // return db.execute(query, [
  //   text,
  //   id
  // ]).then(() => {
  //   return getById(id)
  // })


  // const tweet = tweets.find((tweet) => tweet.id === id);
  // if (tweet) {
  //   tweet.text = text;
  // }
  // return getById(tweet.id);
// }

// export async function remove(id) {

//   return Tweet.findByPk(id).then(tweet => {
//     tweet.destroy()
//   })


  // const query = "DELETE FROM tweets WHERE id = ?"
  // await db.execute(query, [id])


  // tweets = tweets.filter((tweet) => tweet.id !== id);
// }
