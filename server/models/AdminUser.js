const mongoose = require('mongoose')
// 定义模型的字段有哪些
const schema = new mongoose.Schema({
  
    username:{ type:String},
    password:{ 
    type:String,
    select:false,
    set(val) {
        return require('bcrypt').hashSync(val, 10)
    }
    },
    
   

})
module.exports = mongoose.model('AdminUser', schema)


