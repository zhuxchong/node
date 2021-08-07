/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 22:28:05
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:27:37
 * @FilePath: /node/src/user.js
 */
const handleUserRouter = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];

  if (method === "POST" && path === "/api/user/login") {
    return {
      msg: "Login",
    };
  }
};
module.exports = handleUserRouter;
