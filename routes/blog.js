var express = require("express");
var router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModal, ErrorModal } = require("../module/resModule");
const loginCheck = require("../middleware/loginCheck");

router.get("/list", function (req, res, next) {
  let author = req.query.author || "";
  const kw = req.query.keyword || "";

  //  if (req.query.isadmin) {
  //    const checkIsNotLogin = loginCheck(req);
  //    if (checkIsNotLogin) {
  //      return checkIsNotLogin;
  //    }
  //    author = req.session.username;
  //  }

  const data = getList(author, kw);
  data.then((listData) => {
    res.json(new SuccessModal(listData));
  });
  // res.json({
  //   errno: 0,
  //   data: [1, 2, 3],
  // });
});

router.get("/detail", function (req, res, next) {
  const id = req.query.id;
  const data = getDetail(id);
  if (data) {
    data.then((r) => {
      res.json(new SuccessModal(r));
      // return new SuccessModal();
    });
  }
});

router.post("/new", loginCheck, function (req, res, next) {
  const blogData = req.body;
  blogData.author = req.session.username;
  const data = newBlog(blogData);
  if (data) {
    data.then((r) => {
      res.json(new SuccessModal(r));
      // return ;
    });
  }
});

router.post("/update", loginCheck, function (req, res, next) {
  const blogData = req.body;
  const data = updateBlog(req.query.id, blogData);
  if (data) {
    data.then((r) => {
      if (r) {
        res.json(new SuccessModal(r));
        return;
      }
      res.json(new ErrorModal("failed"));
      //return new ErrorModal("failed");
      //  return new SuccessModal(res);
    });
  }
});

router.post("/del", loginCheck, function (req, res, next) {
  const author = req.session.username;
  const data = deleteBlog(req.query.id, author);
  if (data) {
    return data.then((r) => {
      if (r) {
        res.json(new SuccessModal(r));
        return;
      }
      res.json(new ErrorModal("failed"));
      //  return new SuccessModal(res);
    });
  }
});

module.exports = router;
