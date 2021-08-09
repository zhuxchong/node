const getList = (author, keyword) => {
  //mock data
  return [
    {
      id: 1,
      title: "title 1",
      content: "content 1",
      createdTime: 1628433119227,
      author: "author 1",
    },
    {
      id: 2,
      title: "title 2",
      content: "content 2",
      createdTime: 1628433156483,
      author: "author 2",
    },
  ];
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
