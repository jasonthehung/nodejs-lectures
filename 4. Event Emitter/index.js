const { logEvents } = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// add listener for the log event
myEmitter.on("log", (message) => logEvents(message));

// emit the log event
setTimeout(() => {
  myEmitter.emit("log", "Log event emtitted!");
}, 2000);
