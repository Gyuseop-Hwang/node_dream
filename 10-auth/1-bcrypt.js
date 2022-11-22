const bcrypt = require('bcrypt');

const password = "abcd1234";

const hashed = bcrypt.hashSync(password, 12);

console.log(password, hashed)

const result = bcrypt.compareSync(password, hashed)

console.log(result)

