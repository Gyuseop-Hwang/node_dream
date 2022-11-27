// import { sequelize } from '../db/database.js';

// export const User = sequelize.define("user", {
//   username: {
//     type: DataTypes.STRING(45),
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING(128),
//     allowNull: false,
//   },
//   name: {
//     type: DataTypes.STRING(45),
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING(45),
//     allowNull: false,
//   },
//   url: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   }
// }, { timestamps: false })

import Sequelize, { Model } from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export default class User extends Model {

  static init(sequelize) {
    return super.init({
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true
      // },
      username: {
        type: DataTypes.STRING(45),
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
    }, {
      sequelize,
      timestamps: true, // createdAt, updatedAt
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true, // deleted : true, deletedAt : 2022. index 상품 deletedAt !== null Rendering 안 되게 
      // charset: 'utf8mb4',
      // collate: 'utf8mb4_general_ci',
    })
  }

  static associate(db) {
    db.User.hasMany(db.Tweet)
  }

}

export async function findByUsername(username) {
  return await User.findOne({ where: { username } })
}

export async function findById(id) {
  return await User.findByPk(id)
}

export async function createUser(user) {
  const newUser = await User.create(user)
  return newUser.dataValues.id;
}