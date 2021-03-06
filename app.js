/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 12:59:36
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:35:46
 * @FilePath: /node/app.js
 */
const { access } = require("./src/utils/log");

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const qs = require("querystring");
const { get, set } = require("./src/db/redis");

// const SESSION_DATA = {};

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
  //记录access log
  access(
    `${req.method} - ${req.url} - ${req.headers["user-agent"]} - ${Date.now()}`
  );

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
    const _k = k.trim();
    req.cookie[_k] = v;
  });

  let needSetCookie = false;
  let userId = req.cookie.userId;

  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {});
  }
  req.sessionId = userId;

  get(req.sessionId)
    .then((sessionData) => {
      if (sessionData == null) {
        set(req.sessionId, {});
        req.session = {};
      }
      req.session = sessionData;

      return getPostData(req);
    })
    .then((postData) => {
      req.body = postData;
      const blogResult = handleBlogRouter(req, res);
      if (blogResult) {
        blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }
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
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }
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
