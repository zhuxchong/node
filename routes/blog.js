const router = require("koa-router")();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModal, ErrorModal } = require("../model/resModule");
const loginCheck = require("../middleware/loginCheck");

router.prefix("/api/blog");

router.get("/list", async function (ctx, next) {
  let author = ctx.query.author || "";
  const kw = ctx.query.keyword || "";

  if (ctx.query.isadmin) {
    console.log("is admin");
    if (ctx.session.username == null) {
      console.error("is admin,not login");
      ctx.body = new ErrorModal("not login");
      return;
    }
    author = ctx.session.username;
  }

  const listData = await getList(author, kw);
  ctx.body = new SuccessModal(listData);
});

router.get("/detail", async function (ctx, next) {
  const id = ctx.query.id;
  const data = await getDetail(id);
  if (data) {
    // data.then((r) => {
    //   res.json(new SuccessModal(r));
    //   // return new SuccessModal();
    // });
    ctx.body = new SuccessModal(data);
  }
});

router.post("/new", loginCheck, async function (ctx, next) {
  const blogData = ctx.request.body;
  blogData.author = ctx.session.username;
  const data = await newBlog(blogData);
  if (data) {
    ctx.body = new SuccessModal(data);
    // data.then((r) => {
    //   res.json(new SuccessModal(r));
    //   // return ;
    // });
  }
});

router.post("/update", loginCheck, async function (ctx, next) {
  const blogData = ctx.request.body;
  const id = ctx.query.id;
  const r = await updateBlog(id, blogData);
  if (r) {
    ctx.body = new SuccessModal(r);
    return;
  }
  ctx.body = new ErrorModal("failed");
});

router.post("/del", loginCheck, async function (ctx, next) {
  const author = ctx.request.username;
  const id = ctx.query.id;
  const r = deleteBlog(id, author);
  if (r) {
    ctx.body = new SuccessModal(r);
    return;
  }
  ctx.body = new ErrorModal("failed");
});

module.exports = router;
