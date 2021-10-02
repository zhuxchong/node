var express = require("express");
var router = express.Router();
const { login } = require("../controller/user");
const { SuccessModal, ErrorModal } = require("../module/resModule");

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModal("not-login"));
      return;
    }
    author = req.session.username;
  }

  const data = login(username, password);

  if (data) {
    data.then((r) => {
      //console.log("res", r);
      if (r.username) {
        req.session.username = r.username;
        req.session.realName = r.realname;
        //set(req.sessionId, req.session);
        res.json(new SuccessModal(r));
        return;
      }
      res.json(new ErrorModal("failed"));
      //  return new SuccessModal(res);
    });
  }
});

router.get("/login-test", (req, res, next) => {
  if (req.session.username) {
    res.json({
      msg: "login",
    });
    return;
  }
  res.json({
    msg: "no login",
  });
});

module.exports = router;
