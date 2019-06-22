const router = require("koa-router")();
const { login,register } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/api/user");

router.post("/login", async function(ctx, next) {
  const { username, password } = ctx.request.body;
  const data = await login(username, password);
  console.log(data);
  if (data.username) {
    // 设置 session
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;
    ctx.body = new SuccessModel(data);
    return;
  }
  ctx.body = new ErrorModel("登录失败");
});

router.post("/register", async function(ctx, next) {
  const body = ctx.request.body;
  const val = await register(body);
  if (val) {
    ctx.body = new SuccessModel();
  } else {
    ctx.body = new ErrorModel("注册失败:该用户名可能已被占用");
  }
});

// router.get("/register", async function(ctx, next) {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0;
//   }
//   ctx.session.viewCount++;
//   ctx.body = {
//     errno: 0,
//     viewCount: ctx.session.viewCount
//   };
// });

module.exports = router;
