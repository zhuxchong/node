const { exec } = require("../db/mysql");

const login = (username, password) => {
  //title,content;
  const sql = `
  select username, realname from users where username='${username}' and password='${password}'
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
