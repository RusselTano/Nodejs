const myModule = require("./module1");
const colors = require("colors");
const util = require("util");
const test = "Hello World";
console.log(test, colors.red(test));

myModule();
console.log(util.types.isDate(123));
console.log("yowoewowow".rainbow);
