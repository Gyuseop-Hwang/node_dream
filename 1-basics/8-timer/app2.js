console.log("code1");
console.time("timeout 0")
setTimeout(() => {
  console.timeEnd("timeout 0")
  console.log('setTimeout 0');
}, 0)

for (let i = 0; i < 1000000000; i++) { }

// console.log("code2")
// setImmediate(() => {
//   console.log("setImmediate");
// })

// console.log("code3");
// process.nextTick(() => {
//   console.log("nextTick")
// })