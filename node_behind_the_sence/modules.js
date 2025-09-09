// console.log(arguments);

// console.log(require("module").wrapper);

// module.exports

const Calculator = require("./modules/test-module-1");
const calc_1 = new Calculator();
console.log(calc_1.add(2, 5));

// exports
// const calc_2 = require("./modules/test-module-2");
const { add, multiply, divide } = require("./modules/test-module-2"); // ES6
// console.log(calc_2.multiply(2, 5));
console.log(multiply(5, 2));

// caching

require("./modules/test-module-3")();
require("./modules/test-module-3")();
require("./modules/test-module-3")();
