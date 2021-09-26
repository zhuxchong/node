const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filename = path.join(__dirname, "../", "../", "logs", "access.log");

//创建read stream
const readStream = fs.createReadStream(filename);

const rl = readline.createInterface({
  input: readStream,
});

let chromeNum = 0;
let sum = 0;

rl.on("line", function (lineData) {
  if (!lineData) {
    return;
  }
  sum++;
  const arr = lineData.split(" - ");
  if (arr[2] && arr[2].indexOf("Chrome") > 0) {
    chromeNum++;
  }
});

rl.on("close", () => {
  console.log(`read finish chrome is ${chromeNum}`);
});
