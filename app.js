const myModule = require("./module1");
const colors = require("colors");
const util = require("util");
const events = require("./events");
const Emitter = require("./Emitter");

const test = "Hello World";
console.log(test, colors.red(test));

myModule();
console.log(util.types.isDate(123));
console.log("yowoewowow".rainbow);

// emitter and events
const emitter = new Emitter();

emitter.on(events.FILE_OPENED, () => console.log("File opened"));
emitter.on(events.FILE_READ, () => console.log("File read"));

emitter.emit(events.FILE_OPENED);

