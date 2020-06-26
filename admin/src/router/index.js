import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      { path:'/Categories/create', component:CategoryEdit },
      { path:'/Categories/edit/:id', component:CategoryEdit, props:true },
      //把这里面的id都注入到CategoryEdit里面
      { path:'/Categories/list', component:CategoryList }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
