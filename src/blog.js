/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 22:28:05
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:26:52
 * @FilePath: /node/src/blog.js
 */
const handleBlogRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];

  if (method === "GET" && path === "/api/blog/list") {
    return {
      msg: "Get Blog list",
    };
  }

  if (method === "GET" && path === "/api/blog/detail") {
    return {
      msg: "Get Blog detail",
    };
  }

  if (method === "POST" && path === "/api/blog/new") {
    return {
      msg: "Post new Blog",
    };
  }

  if (method === "POST" && path === "/api/blog/update") {
    return {
      msg: "Update new Blog",
    };
  }

  if (method === "POST" && path === "/api/blog/delete") {
    return {
      msg: "Delete new Blog",
    };
  }
};
module.exports = handleBlogRouter;
