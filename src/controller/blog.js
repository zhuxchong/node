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

module.exports = { getList };
