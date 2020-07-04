const express= require ("express")
// 引用express

const app = express()
// 定义app是express的一个实例

app.set('secret', '12433zha3ng3z3hao3long3ke3xin123')


// 中间件
app.use(require("cors")())
app.use(express.json())
//托管静态文件,也是静态路由吧
app.use('/uploads', express.static(__dirname + '/uploads'))

// 使用方法，用一个函数指向对象,这样子就有一个admin有一个app对象可以用 引用
require("./plugins/db")(app)
require("./routes/admin")(app)
require("./routes/web")(app)






// 监听3000端口，启动后做什么
app.listen(3000, () =>{
    console.log('http://localhost:3000');
      
})