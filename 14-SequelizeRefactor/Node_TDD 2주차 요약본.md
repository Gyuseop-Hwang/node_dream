# Node_TDD 스터디 2주차 요약

1. 드림코딩 : 노드로 배우는 백엔드 강의에서 Mysql, Sequelize 부분을 공부하고 refactoring 및 리뷰

---

2. Sequelize와 sequelize의 차이

```
import Sequelize from 'sequelize'
/// 시퀼라이즈 모듈
import {Sequelize} from 'sequelize'
```

Sequelize = {Sequelize}가 동일하다.
import SQ from 'sequelize'를 보통 SQ(Sequelize)안의 내부 prop들을 또 이용해야 할 때 주로 사용한다.

---

3. sequelize.define 대신 Sequleize.Model을 사용하여 class로 Modeling

```
import Sequelize, { Model } from 'sequelize';
import User from './auth.js'
// const { User } = db;

const DataTypes = Sequelize.DataTypes;


export default class Tweet extends Model {

  static init(sequelize) {
    super.init({

      id : { 생략 가능 ...},

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
```

이렇게 하면 Model을 한 파일에 구체화해두고, index.js(db 파일)에서 한번에 관리할 수 있다. app.js에서 import하면 한번에 Model의 작업들이 수행됨. 개별 파일에 Model(Tweet)을 두므로 책임다루기와 관리가 용이함.

---

4. sequelize-cli

npm package sequelie-cli 참조 <https://www.npmjs.com/package/sequelize-cli>

npm i sequelize-cli 후에 여러 명령어들을 사용할 수 있다.

npx sequelize init

=>config, migration, models, seeders 폴더가 생성된다.

config : sequelize cli 명령어 관련 config를 설정

migration : data migration 관련 로직 작성

models : DB와 Model과 관련된 로직을 작성한다.

seeders : data mocking. seed data 심기 위한 로직을 작성한다.

npx sequelize db:create (default : development)

npx sequelize db:create --env test(test용 db 생성)

---

5. config와 env에 따라 development인지 test인지 나뉘어서 작업

```
const env = process.env.NODE_ENV || 'development';
const dbConfig = config.db[env]

const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

///// app.js
db.sequelize.sync({ force: false })
```

6. 참조 config/config.js파일과 config 파일

```
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "dwitter",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "dwitter_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }


  /////// config.js 파일에 동일한 내용 탑재

}
```
