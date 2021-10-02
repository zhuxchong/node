var express = require("express");
var router = express.Router();
const { login } = require("../controller/user");
const { SuccessModal, ErrorModal } = require("../module/resModule");

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;

  const data = login(username, password);

  if (data) {
    data.then((res) => {
      if (res.username) {
        req.session.username = res.username;
        req.session.realName = res.realname;
        //set(req.sessionId, req.session);
        res.json(new SuccessModal(res));
        return;
      }
      res.json(new ErrorModal("failed"));
      //  return new SuccessModal(res);
    });
  }
});

module.exports = router;
