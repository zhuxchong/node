/*
 * @Description:
 * @Author: Luke Z
 * @Date: 2021-08-07 22:28:05
 * @LastEditors: Luke Z
 * @LastEditTime: 2021-08-07 23:35:53
 * @FilePath: /node/src/user.js
 */
const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === "POST" && req.path === "/api/user/login") {
    return {
      msg: "Login",
    };
  }
};
module.exports = handleUserRouter;
