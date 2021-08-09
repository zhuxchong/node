/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 22:28:05
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:35:53
 * @FilePath: /node/src/user.js
 */
const { login: loginCheck } = require("../controller/user");
const { SuccessModal, ErrorModal } = require("../module/resModule");

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;

    const data = loginCheck(username, password);

    if (data) {
      return new SuccessModal(data);
    } else {
      return new ErrorModal("failed");
    }
    // return JSON.stringify({ test: 123 });
  }
};
module.exports = handleUserRouter;
