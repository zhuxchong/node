const { exec, escape } = require("../db/mysql");
const { generatePassword } = require("../utils/cryp");

const login = (username, password) => {
  username = escape(username);
  password = escape(password);
  password = generatePassword(password);
  //title,content;
  const sql = `
  select username, realname from users where username=${username} and password=${password}
  `;
  return exec(sql).then((res) => {
    return res[0] || {};
  });
  // if (username === "zxc" && password == 123) {
  //   return true;
  // }
  // return false;
};
module.exports = { login };
