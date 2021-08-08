/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 22:28:05
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:36:08
 * @Filereq.path: /node/src/blog.js

*/
const { getList } = require("../controller/blog");
const { SuccessModal, ErrorModal } = require("../module/resModule");

const handleBlogRouter = (req, res) => {
  const method = req.method;

  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const kw = req.query.keyword || "";
    const data = getList(author, kw);
    return new SuccessModal(data);
  }

  if (method === "GET" && req.path === "/api/blog/detail") {
    return {
      msg: "Get Blog detail",
    };
  }

  if (method === "POST" && req.path === "/api/blog/new") {
    return {
      msg: "Post new Blog",
    };
  }

  if (method === "POST" && req.path === "/api/blog/update") {
    return {
      msg: "Update new Blog",
    };
  }

  if (method === "POST" && req.path === "/api/blog/delete") {
    return {
      msg: "Delete new Blog",
    };
  }
};
module.exports = handleBlogRouter;
