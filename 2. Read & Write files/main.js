const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// fs.readFile("./files/starter.txt", (err, data) => {
//   if (err) throw err;

//   console.log(data); //<Buffer 48 69 2c 20 6d 79 20 6e 61 6d 65 20 69 73 20 4a 61 73 6f 6e 2e>
//   console.log(data.toString()); // Hi, my name is Jason.
// });

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf-8",
  (err, data) => {
    if (err) throw err;

    console.log(data); // Hi, my name is Jason.

    console.log("Read complete.");
  }
);

/*
Note: `writeFile` and `appendFile` are asynchronous operations, so their execution order is not guaranteed.
If `appendFile` is not executed after `writeFile` completes, there's a risk that `writeFile` may overwrite 
or flush the file contents, causing appended data to be lost.
To ensure correct behavior, always run `appendFile` after `writeFile` has finished.
*/
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you.",
  (err) => {
    if (err) throw err;

    console.log("Write complete.");

    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\nYes, it is.",
      (err) => {
        if (err) throw err;

        console.log("Append complete.");

        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "RenamedReply.txt"),
          (err) => {
            if (err) throw err;

            console.log("Rename complete.");
          }
        );
      }
    );
  }
);

// Listening for uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});

// ===========================================================

// We can use the `fsPromises` module to work with promises instead of callbacks.
// We use `fsPromises` for Promise-based file operations.
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf-8"
    );

    console.log(data);

    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you."
    );

    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseCompleted.txt")
    );

    // `unlink` is used to delete a file.
    // await fsPromises.unlink(path.join(__dirname, "files", "promiseCompleted.txt"));
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

fileOps();
