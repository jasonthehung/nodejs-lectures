const fs = require("fs");

if (!fs.existsSync("./newDir")) {
  fs.mkdir("./newDir", (err) => {
    if (err) throw err;

    console.log("Directory created.");
  });
}

if (fs.existsSync("./newDir")) {
  fs.rmdir("./newDir", (err) => {
    if (err) throw err;

    console.log("Directory removed.");
  });
}

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});
