module.exports = app => {
    const express =require("express")
    // 引入express子路由
    const router = express.Router()

    const Category =require("../../models/Category")
    // 方法使用
    router.post('/categories', async(req,res)=>{
        const model = await Category.create(req.body)
        // 发回客户端让客户端知道创建完成了，分类接口定义好，一套打法完毕，涉及到数据库搭建，接口搭建，模型搭建
        res.send(model)
    })
    router.put('/categories/:id', async(req,res)=>{
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        // put编辑修改路由
        res.send(model)
    })
    router.delete('/categories/:id', async(req,res)=>{
        await Category.findByIdAndDelete(req.params.id, req.body)
        // put编辑修改路由
        res.send({
            success: true
        })
    })
    router.get('/categories', async(req,res)=>{
        const items = await Category.find().populate('parent').limit(10)
        // 获取分类列表的数据用items表示
        res.send(items)
    })
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        // 通过req.params.id找id，获取分类详情页内容，就要从获取相应内容id开始，接口是要获取的
        res.send(model)
    })
    app.use("/admin/api", router)
    // 挂载子路由
}