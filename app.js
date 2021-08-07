/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 12:59:36
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:35:46
 * @FilePath: /node/app.js
 */
const handleBlogRouter = require("./src/blog");
const handleUserRouter = require("./src/user");
const serverHandler = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const url = req.url;
  req.path = url.split("?")[0];

  const blogData = handleBlogRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData));
    return;
  }
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(blogData));
    return;
  }
  //404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("404 Not Found");
  res.end();
};
module.exports = serverHandler;
