/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 12:59:31
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 13:02:42
 * @FilePath: /node/bin/www.js
 */
const http = require("http");
const PORT = 8000;
const serverHandler = require("../app");
const server = http.createServer(serverHandler);
server.listen(PORT, () => {
  console.log("connected");
});
