// import { User } from './auth.js'

// const DataTypes = SQ.DataTypes;

// import { sequelize } from '../db/database.js'
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

import Sequelize, { Model } from 'sequelize';
import User from './auth.js'
// const { User } = db;

const DataTypes = Sequelize.DataTypes;


export default class Tweet extends Model {

  static init(sequelize) {
    super.init({
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true
      // },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: "Tweet",
      tableName: "tweets",
      paranoid: false,
      // charset: 'utf8mb4',
      // collate: 'utf8mb4_general_ci',
    })
  }

  static associate(db) {
    db.Tweet.belongsTo(db.User)
  } // userId

}



const INCLUDE_USER = {

  include: [{
    model: User
  }]

}

const ORDER_DESC = {
  order: [["createdAt", "DESC"]]
}

export async function getAll() {

  return await Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC
  })

}

export async function getAllByUsername(username) {

  return await Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include[0],
      where: { username }
    }
  })

}

export async function getById(id) {

  return await Tweet.findOne({
    where: { id },
    ...INCLUDE_USER
  })
}

export async function create(text, userId) {

  return Tweet.create({ text, userId }).then(data => {
    return getById(data.dataValues.id)
  })
}

export async function update(id, text) {


  return Tweet.findByPk(id, INCLUDE_USER).then(tweet => {
    tweet.text = text;
    return tweet.save()
  })

}

export async function remove(id) {

  return Tweet.findByPk(id).then(tweet => {
    tweet.destroy()
  })

}
