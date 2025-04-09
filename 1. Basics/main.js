// How NodeJS differs from Vanilla JS
// 1. NodeJS is a runtime environment that allows you to run JavaScript on the server side.
// 2. The console is the terminal window.
// 3. NodeJS has built-in modules like 'fs' for file system operations.
// 4. NodeJS uses CommonJS module system (require/exports) instead of ES6 modules (import/export).
// 5. Global object instead of window object.
console.log(global);

const os = require("os");
const path = require("path");

console.log(os.type());
console.log(os.version());
console.log(os.homedir()); // /Users/jasonthehung

// ==========================================================
console.log(__dirname); // /Users/jasonthehung/Desktop/nodejs-lectures/1. Basics
console.log(__filename); // /Users/jasonthehung/Desktop/nodejs-lectures/1. Basics/main.js

// ==========================================================
console.log(path.dirname(__filename)); // /Users/jasonthehung/Desktop/nodejs-lectures/1. Basics
console.log(path.basename(__filename)); // main.js
console.log(path.extname(__filename)); // .js

// ==========================================================
const { root, dir, base, ext, name } = path.parse(__filename);
console.log(root); // /
console.log(dir); // /Users/jasonthehung/Desktop/nodejs-lectures/1. Basics
console.log(base); // main.js
console.log(ext); // .js
console.log(name); // main

// ==========================================================
const math = require("./math");
const { subtract } = require("./math");

console.log(math.add(1, 2));
console.log(subtract(4, 3));
