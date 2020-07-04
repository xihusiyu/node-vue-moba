const mongoose = require('mongoose')
// 定义模型的字段有哪些
const schema = new mongoose.Schema({
  
    name:{ type:String},
    body:{ type:String},
    items:[{
        image:{type:String,},
        url:{type:String,}
        
    }]
   

})
module.exports = mongoose.model('Ad', schema)


