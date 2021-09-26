const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

const con = mysql.createConnection(MYSQL_CONF);

con.connect((e) => {
  console.log(e);
  console.log("db connected");
});

function exec(sql) {
  const promise = new Promise((res, rej) => {
    con.query(sql, (err, result) => {
      if (err) {
        rej(err);
      }
      res(result);
    });
  });
  return promise;
}

module.exports = { exec, escape: mysql.escape };
