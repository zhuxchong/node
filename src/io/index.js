const fs = require("fs");
const path = require("path");

const file1 = path.resolve(__dirname, "from.txt");
const file2 = path.resolve(__dirname, "to.txt");

const readStream = fs.createReadStream(file1);
const writeStream = fs.createWriteStream(file2);

readStream.pipe(writeStream);

readStream.on("end", function () {
  console.log("finish");
});
