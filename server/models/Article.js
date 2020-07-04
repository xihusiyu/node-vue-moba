const mongoose = require("mongoose");
// 定义模型的字段有哪些
const schema = new mongoose.Schema({
  title: { type: String },
  // 需要做关联,多选，一个英雄可以关联多个分类，mongoose语法变成数组
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  body: { type: String },
},
{
    timestamps: true
}


);
module.exports = mongoose.model("Article", schema);
