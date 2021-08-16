const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  //mock data

  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}'`;
  }
  if (keyword) {
    sql += `and title like '%%${keyword}%%'`;
  }
  sql += `order by createtime desc`;

  return exec(sql);
};

const getDetail = (id) => {
  //mock data
  return {
    id: 1,
    title: "title 1",
    content: "content 1",
    createdTime: 1628433119227,
    author: "author 1",
  };
};

const newBlog = (data = {}) => {
  // console.log("input data", data);
  //title,content;
  return {
    title: "New",
    id: "new Blog",
  };
};

const updateBlog = (id, data = {}) => {
  return {
    title: "update",
    id: "update Blog",
  };
};

const deleteBlog = (id) => {
  return {
    title: "delete",
    id,
  };
};

module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog };
