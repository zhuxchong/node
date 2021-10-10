const router = require("koa-router")();
const { login } = require("../controller/user");
const { SuccessModal, ErrorModal } = require("../model/resModule");

router.prefix("/api/user");

router.post("/login", async function (ctx, next) {
  const { username, password } = ctx.request.body;

  const r = await login(username, password);

  if (r) {
    if (r.username) {
      ctx.session.username = r.username;
      ctx.session.realName = r.realname;
      //set(req.sessionId, req.session);
      ctx.body = new SuccessModal(r);
      return;
    }
    ctx.body = new ErrorModal("failed");
  }
});

router.get("/session-test", async function (ctx, next) {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;
  ctx.body = {
    err: 1,
    count: ctx.session.viewCount,
  };
});

// router.get("/bar", function (ctx, next) {
//   ctx.body = "this is a users/bar response";
// });

module.exports = router;
