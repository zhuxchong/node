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

const handleUserRouter = (req, response) => {
  const method = req.method;

  if (method === "GET" && req.path === "/api/user/login") {
    const { username, password } = req.query;

    const data = login(username, password);

    if (data) {
      return data.then((res) => {
        if (res.username) {
          response.setHeader("Set-Cookie", `username=${res.username}; path=/`);
          return new SuccessModal(res);
        }
        return new ErrorModal("failed");
        //  return new SuccessModal(res);
      });
    }
    // return JSON.stringify({ test: 123 });
  }
  // if (method === "GET" && req.path === "/api/user/login-test") {
  //   if (req.cookie.username) {
  //     return Promise.resolve(new SuccessModal());
  //   }
  //   return Promise.resolve(new ErrorModal("failed"));
  // }
};
module.exports = handleUserRouter;
