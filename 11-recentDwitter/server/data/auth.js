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

import { db } from '../db/database.js'
import { sequelize } from '../db/database.js'
import SQ, { Model } from 'sequelize'
const DataTypes = SQ.DataTypes;

export const User = sequelize.define("user", {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   autoIncrement: true,
  //   primaryKey: true
  // },
  username: {
    type: DataTypes.STRING(45),
    // unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, { timestamps: false })

// class User extends Model { }

// User.init({
//   username: {
//     type: SQ.STRING(45),
//     // unique: true,
//     allowNull: false,
//   },
//   password: {
//     type: SQ.STRING(128),
//     allowNull: false,
//   },
//   name: {
//     type: SQ.STRING(45),
//     allowNull: false,
//   },
//   email: {
//     type: SQ.STRING(45),
//     allowNull: false,
//   },
//   url: {
//     type: SQ.TEXT,
//     allowNull: true,
//   }
// }, { sequelize })



export async function findByUsername(username) {

  return await User.findOne({ where: { username } })


  // const query = `SELECT * FROM users WHERE username = ?`

  // return db.execute(query, [username]).then(result => {
  //   return result[0][0];
  // })


  // return users.find((user) => user.username === username);
}

export async function findById(id) {

  // return await User.findOne({ where: { id } })
  return await User.findByPk(id)


  // const query = `SELECT * FROM users WHERE id = ?`

  // return db.execute(query, [id]).then(result => {
  //   return result[0][0];
  // })


  // return users.find((user) => user.id === id);
}

export async function createUser(user) {

  // const { username, password, name, email, url } = user;

  const newUser = await User.create(user)
  return newUser.dataValues.id;

  // const { username, password, name, email, url } = user;
  // const query = "INSERT INTO users (username, password, name, email, url) VALUES(?, ?, ?, ?, ?)"
  // return db.execute(query, [
  //   username,
  //   password,
  //   name,
  //   email,
  //   url
  // ]).then(result => {
  //   console.log(result)
  //   return result[0].insertId;
  // })


  // const created = { ...user, id: Date.now().toString() };
  // users.push(created);
  // return created.id;

}
