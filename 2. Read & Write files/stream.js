const fs = require("fs");
const path = require("path");

// Efficiently read and write large files using streams

const sourcePath = path.join(__dirname, "files", "20M.txt");
const destinationPath = path.join(__dirname, "files", "write20M.txt");

// Create a readable stream
const readStream = fs.createReadStream(sourcePath, {
  encoding: "utf-8",
});

// Create a writable stream
const writeStream = fs.createWriteStream(destinationPath);

// Pipe the readable stream directly into the writable stream
// This is more efficient and cleaner than manually handling 'data' events
readStream.pipe(writeStream);

// rs.on("data", (chunk) => {
//   ws.write(chunk);
// });
