import db from '../models/index.js' // npm test -> common js module.exports = export, require

beforeAll(async () => {
  await db.sequelize.sync()
})

test("1 + 1은 1이야", () => {
  expect(1 + 1).toEqual(2)
})

console.log(process.env.NODE_ENV)

afterAll(async () => {
  await db.sequelize.sync({ force: true })
})