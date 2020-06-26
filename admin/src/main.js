import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false



import http from "./http"
Vue.prototype.$http = http
// 把它加载到vue实例属性，原型上，然后用this.http就可以访问数据请求接口

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
