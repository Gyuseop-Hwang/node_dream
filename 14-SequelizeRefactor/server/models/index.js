// 'use strict';

import Sequelize from 'sequelize';
import { config } from '../config.js'
import User from './auth.js'
import Tweet from './tweet.js'


const env = process.env.NODE_ENV || 'development';
const dbConfig = config.db[env]
// import config from "../config/config.json" assert {type: 'json'};

const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });



db.sequelize = sequelize;
db.User = User;
db.Tweet = Tweet;

User.init(sequelize);
Tweet.init(sequelize);

User.associate(db);
Tweet.associate(db);


export default db;
