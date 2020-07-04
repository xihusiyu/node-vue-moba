module.exports = (app) => {
  const express = require("express");

  const jwt = require("jsonwebtoken");

  const AdminUser = require("../../models/AdminUser");

  const assert = require("http-assert");

  // 引入express子路由  
  const router = express.Router({
    mergeParams: true,
  });

  // 创建资源
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    // 发回客户端让客户端知道创建完成了，分类接口定义好，一套打法完毕，涉及到数据库搭建，接口搭建，模型搭建
    res.send(model);
  });
  // 更新资源
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    // put编辑修改路由
    res.send(model);
  });
  // 删除资源
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    // put编辑修改路由
    res.send({
      success: true,
    })
  })
  // 资源列表
  router.get(
    "/",

    async (req, res) => {
      // 得到分类列表通用接口模型的名称，不知道单数复数或者大小写可以这样转换
      const queryOptions = {};
      if (req.Model.modelName === "Category") {
        queryOptions.populate = "parent";
      }

      const items = await req.Model.find().setOptions(queryOptions).limit(100);
      // 获取分类列表的数据用items表示
      res.send(items);
    }
  )
  // 资源详情
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    // 通过req.params.id找id，获取分类详情页内容，就要从获取相应内容id开始，接口是要获取的
    res.send(model)
  }) 

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware= require('../../middleware/resource')


  app.use( "/admin/api/rest/:resource", authMiddleware(), resourceMiddleware() ,router)
  // 挂载子路由,加入中间件

  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" })
  app.post("/admin/api/upload", authMiddleware(),  upload.single("file"), async (req, res) => {

    const file = req.file;
  
    file.url = `http://localhost:3000/uploads/${file.filename}`

    res.send(file)
  })

  app.post("/admin/api/login",  async (req, res) => {
    const { username, password } = req.body;
    // 解构
    // 1.根据用户名找用户

    const user = await AdminUser.findOne({ username }).select("+password");

    assert(user, 422, "用户不存在");
    // if (!user) {
    //   return res.status(422).send({
    //     message: "用户不存在",
    //   });
    // }

    // 2.校验密码
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: "密码错误",
    //   });
    // }

    // 3.返回token

    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({ token });
  });

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
