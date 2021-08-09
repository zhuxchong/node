const login = (username, password) => {
  //title,content;
  if (username === "zxc" && password == 123) {
    return true;
  }
  return false;
};
module.exports = { login };
