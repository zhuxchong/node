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
  res.json({
    errno: 0,
    data: "ok",
  });
});

module.exports = router;
