/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 22:28:05
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:36:08
 * @Filereq.path: /node/src/blog.js

*/
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModal, ErrorModal } = require("../module/resModule");

//login check
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModal("not login"));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  if (method === "GET" && req.path === "/api/blog/list") {
    let author = req.query.author || "";
    if (req.query.isadmin) {
      const checkIsNotLogin = loginCheck(req);
      if (checkIsNotLogin) {
        return checkIsNotLogin;
      }
      author = req.session.username;
    }
    const kw = req.query.keyword || "";
    const data = getList(author, kw);
    return data.then((res) => {
      return new SuccessModal(res);
    });
  }

  if (method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id;
    const data = getDetail(id);
    if (data) {
      return data.then((res) => {
        return new SuccessModal(res);
      });
    }
  }

  if (method === "POST" && req.path === "/api/blog/new") {
    const checkIsNotLogin = loginCheck(req);
    if (checkIsNotLogin) {
      return loginCheck;
    }
    const blogData = req.body;
    blogData.author = req.session.username;
    const data = newBlog(blogData);
    if (data) {
      return data.then((res) => {
        return new SuccessModal(res);
      });
    }
    // return new SuccessModal(data);
  }

  if (method === "POST" && req.path === "/api/blog/update") {
    const checkIsNotLogin = loginCheck(req);
    if (checkIsNotLogin) {
      return loginCheck;
    }
    const blogData = req.body;
    const data = updateBlog(id, blogData);
    if (data) {
      return data.then((res) => {
        if (res) {
          return new SuccessModal(res);
        }
        return new ErrorModal("failed");
        //  return new SuccessModal(res);
      });
    }
    // if (data) {
    //   return new SuccessModal(data);
    // } else {
    //   return new ErrorModal("failed");
    // }
  }

  if (method === "POST" && req.path === "/api/blog/delete") {
    const checkIsNotLogin = loginCheck(req);
    if (checkIsNotLogin) {
      return loginCheck;
    }
    const author = req.session.username;
    const data = deleteBlog(id, author);
    if (data) {
      return data.then((res) => {
        if (res) {
          return new SuccessModal(res);
        }
        return new ErrorModal("failed");
        //  return new SuccessModal(res);
      });
    }
  }
};
module.exports = handleBlogRouter;
