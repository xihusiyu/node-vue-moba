<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"> </el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
         
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  //接收props id,将路由解耦和它
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      // value: ""
    };
  },
  methods: {
    afterUpload(res){
      // vue里面的属性赋值，解决的是之前未定义，后期使用显示不了值
      // 条件:数据并不存在，后来又加一个数据的话，最好是用这个语法
      this.$set(this.model, 'icon', res.url)
      // this.model.icon = res.url
    },
    // 跳转到items这个页面，异步的回调函数的写法写成类似同步的写法
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/items", this.model);
      }

      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id} `);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

