const jwt = require('jsonwebtoken');


const jwtKey = process.env.jwtKey || "jwtSecret"

const token = jwt.sign({
  id: "userId",
  isAdmin: true
}, jwtKey, { expiresIn: 2 })

setTimeout(() => {
  jwt.verify(token, jwtKey, (err, decode) => {
    console.log(err, decode)
  })
}, 2000)

console.log(token)