const fs = require('fs');

try {
  fs.renameSync('./text.txt', './text-new.txt')
} catch (err) {
  console.log(err)
}

// fs.rename("./text-new.txt", "./text.txt", (err) => {
//   console.log(err)
// })

fs.promises.rename('./text2.txt', './text-new.txt')
  .then(() => {
    console.log("done")
  })
  .catch(console.log)

console.log("hello")

// fs.rename