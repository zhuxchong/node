/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 22:28:05
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:35:53
 * @FilePath: /node/src/user.js
 */
const { login } = require("../controller/user");
const { SuccessModal, ErrorModal } = require("../module/resModule");
const { set } = require("../db/redis");

const handleUserRouter = (req, response) => {
  const method = req.method;

  if (method === "GET" && req.path === "/api/user/login") {
    const { username, password } = req.query;

    const data = login(username, password);

    if (data) {
      return data.then((res) => {
        if (res.username) {
          req.session.username = res.username;
          req.session.realName = res.realname;

          set(req.sessionId, req.session);
          console.log("req session is", req.session);
          return new SuccessModal(res);
        }
        return new ErrorModal("failed");
        //  return new SuccessModal(res);
      });
    }
    // return JSON.stringify({ test: 123 });
  }
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModal({
          session: req.session.username,
        })
      );
    }
    return Promise.resolve(new ErrorModal("failed"));
  }
};
module.exports = handleUserRouter;
