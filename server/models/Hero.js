const mongoose = require('mongoose')
// 定义模型的字段有哪些
const schema = new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    banner:{type:String},
    title:{ type:String},
    // 需要做关联,多选，一个英雄可以关联多个分类，mongoose语法变成数组
    categories:[{type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
    // 复合类型
    scores:{
        difficult:{type: Number},
        skills:{type: Number},
        attack:{type:Number},
        survive:{type:Number}
    },
    skills: [{
        icon: {type: String},
        name:{type:String},
        delay:{type:String},
        cost:{type:String},
        description:{type:String},
        tips:{type: String}
    }],
    items1: [{type:mongoose.SchemaTypes.ObjectId, ref:'Item'}],
    items2: [{type:mongoose.SchemaTypes.ObjectId, ref:'Item'}],
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId, ref:'Hero'},
        description:{type:String}
    }]

})
module.exports = mongoose.model('Hero', schema, 'heroes')  //模型名称，表结构 参数集合

