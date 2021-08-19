/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 12:59:36
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:35:46
 * @FilePath: /node/app.js
 */
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const qs = require("querystring");

const getPostData = (req) => {
  const promise = new Promise((res, rej) => {
    if (req.method !== "POST") {
      res({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      res({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        res({});
        return;
      }
      res(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandler = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const url = req.url;
  req.path = url.split("?")[0];

  req.query = qs.parse(url.split("?")[1]);
  //handle Post
  //handle cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }
    const [k, v] = item.split("=");
    req.cookie[k] = v;
  });

  getPostData(req).then((postData) => {
    req.body = postData;
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        if (blogData) {
          res.end(JSON.stringify(blogData));
        }
      });
      return;
    }

    // const userData = handleUserRouter(req, res);
    const userData = handleUserRouter(req, res);
    if (userData) {
      userData.then((userData) => {
        if (userData) {
          res.end(JSON.stringify(userData));
        }
      });
      return;
    }
    //404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  });
};
module.exports = serverHandler;
