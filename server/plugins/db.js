module.exports = app => {
    const mongoose =require("mongoose")
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true,useUnifiedTopology:true, useFindAndModify: false
    })

    require('require-all')(__dirname + '/../models')
}

// 要让 mongoose 使用 `findOneAndUpdate()`.注意选项设置为`true`
// 默认选项为 false.

