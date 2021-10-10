const { exec } = require("../db/mysql");
const xss = require("xss");

const getList = async (author, keyword) => {
  //mock data

  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}'`;
  }
  if (keyword) {
    sql += `and title like '%%${keyword}%%'`;
  }
  sql += `order by createtime desc`;

  return await exec(sql);
};

const getDetail = async (id) => {
  let sql = `select * from blogs where id='${id}' `;
  const detail = await exec(sql);
  return (detail || [])[0];
  //   return exec(sql).then((res) => {
  //     return res[0];
  //   });
};

const newBlog = async (data = {}) => {
  // console.log("input data", data);
  //title,content;
  const title = xss(data.title);
  const content = data.content;
  const author = data.author;
  const createTime = Date.now();
  const sql = `insert into blogs (title,content,author,createtime) 
  values('${title}','${content}','${author}','${createTime}');
  `;
  const detail = await exec(sql);
  return {
    id: detail,
  };
  //   return
  //   return exec(sql).then((insertData) => {
  //     // console.log("insertData", insertData);
  //     return {
  //       id: insertData.insertId,
  //     };
  //   });
};

const updateBlog = async (id, data = {}) => {
  const title = data.title;
  const content = data.content;
  const sql = `update blogs set title='${title}' , content='${content}' where id=${id}
  `;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) return true;
  return false;

  //   return exec(sql).then((updateData) => {
  //     if (updateData.affectedRows > 0) return true;
  //     return false;
  //   });
  // return {
  //   title: "update",
  //   id: "update Blog",
  // };
};

const deleteBlog = async (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'
  `;
  const updateData = await exec(sql);
  if (updateData.affectedRows > 0) return true;
  return false;
  //   return exec(sql).then((updateData) => {
  //     if (updateData.affectedRows > 0) return true;
  //     return false;
  //   });
};

module.exports = { getList, getDetail, newBlog, updateBlog, deleteBlog };
