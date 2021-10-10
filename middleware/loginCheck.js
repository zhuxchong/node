const { ErrorModal } = require("../model/resModule");

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
    return;
  }

  ctx.body = new ErrorModal("not login");
};
