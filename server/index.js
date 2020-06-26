const express= require ("express")
// 引用express

const app = express()
// 定义app是express的一个实例


// 中间件
app.use(require("cors")())
app.use(express.json())

// 使用方法，用一个函数指向对象,这样子就有一个admin有一个app对象可以用
require("./routes/admin")(app)
require("./plugins/db")(app)


// 监听3000端口，启动后做什么
app.listen(3000, () =>{
    console.log('http://localhost:3000');
      
})