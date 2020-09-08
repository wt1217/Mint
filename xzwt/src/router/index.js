import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// 导入组件
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Me from '../views/Me.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

  const routes = [
  {
	path:'/index',
	component:Index
  },
  {
  	path:'/article/:id',
  	component:Article
  },
  {
  	path:'/register',
  	component:Register
  },
  {
  	path:'/login',
  	component:Login
  },
  {
    path:'/me',
    component:Me
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
