const fs = require('fs').promises;


fs.readFile('./text.txt', { encoding: "utf-8" })
  .then(console.log)
  .catch(console.error)


fs.appendFile('./file.txt', "Yo, Dream Coders")
  .catch(console.error)

fs.copyFile('./file.txt', './file2.txt')
  .catch(console.error)

fs.mkdir('sub-folder')
  .catch(console.error)

fs.readdir('./')
  .then(console.log)
  .catch(console.error)