import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  port: parseInt(required('PORT', 8080)),
  db: {
    development: {
      username: "root",
      password: "Fhqls78@@9",
      database: "dwitter",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false,
    },
    test: {
      username: "root",
      password: "Fhqls78@@9",
      database: "dwitter_test",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false,
    },
    production: {
      username: "root",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "mysql"
    }
  },
  cors: {
    allowedOrigin: required('CORS_ALLOW_ORIGIN')
  }
};
