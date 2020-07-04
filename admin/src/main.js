import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import './style.css'

import http from "./http"
Vue.prototype.$http = http
// 把它加载到vue实例属性，原型上，然后用this.http就可以访问数据请求接口

// 代码块方法可以随时的使用
Vue.mixin({

  computed:{
      uploadUrl(){
        return this.$http.defaults.baseURL + '/upload'
      }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// 全局应用入口文件