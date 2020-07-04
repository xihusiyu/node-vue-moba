


module.exports= options =>{

  const assert = require("http-assert")
  const jwt = require("jsonwebtoken")
  const AdminUser = require("../models/AdminUser")

  
    return  async (req, res, next) => {
        // 中间件异步请求头校验吧
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')
    
        const {id} = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')
    
        // 客户端请求时用户是谁
        req.user = await AdminUser.findById(id)
        
        
        assert(req.user, 401, '请先登录')
    
        await next()
      }
}