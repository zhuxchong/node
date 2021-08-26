const fs = require("fs");
const path = require("path");

const file1 = path.resolve(__dirname, "from.txt");
const file2 = path.resolve(__dirname, "to.txt");

const readStream = fs.createReadStream(file1);
const writeStream = fs.createWriteStream(file2);

readStream.pipe(writeStream);

readStream.on("on", function (chunk) {
  console.log("chunk", chunk);
});

readStream.on("end", function () {
  console.log("finish");
});

//get download
const http = require("http");
const server = http.createServer(function (req, res) {
  const method = req.method;
  if (method === "GET") {
    const fileName = fs.createReadStream(file1);
    const stream = fs.createReadStream(fileName);
    stream.pipe(res);
  }
});
