const logger = require('./logger');

const emitter = new logger.Logger();


emitter.on("log", (evt) => {
  console.log(evt);
})

emitter.log(() => {
  console.log("doing something....")
})