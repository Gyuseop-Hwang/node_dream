import "dotenv/config"

function require(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue
  if (value == null) {
    throw new Error(`key ${key} is not exists`)
  }
  return value;
}

export const config = {
  server: {
    PORT: parseInt(require("PORT", 8080))
  },
  jwt: {
    jwtSecret: require("JWT_SECRET"),
    jwtExpiresInSec: parseInt(require("JWT_EXPIRESIN", 86400))
  },
  bcrypt: {
    bcryptSaltRounds: parseInt(require("BCRYPT_SALT_ROUNDS", 12))
  }
} 