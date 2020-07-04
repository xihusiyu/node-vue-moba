const mongoose = require('mongoose')
// 定义模型的字段有哪些
const schema = new mongoose.Schema({
    name:{type:String},
    // 它是一个数据库里面的objectID,mongodb里面的id是ObjectId,ref关联的哪个模型
    parent: {type:mongoose.SchemaTypes.ObjectId, ref: 'Category'},  
})


schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})


module.exports = mongoose.model('Category', schema)


