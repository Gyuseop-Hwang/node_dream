// const { increase, getCount } = require('./counter');
import counter from './counter.js';


console.log(counter.getCount());
counter.increase();
console.log(counter.getCount());
