import Vue from 'vue'
import Router from 'vue-router'
import local from '@/utils/localstorage'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login'
import Index from '@/views/index'
import UserInfo from '@/views/userInfo'

Vue.use(Router)

const RouterList = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: '首页',
      isLogin: true
    }
  },
  {
    path: '/index/userInfo',
    name: 'userInfo',
    component: UserInfo,
    meta: {
      title: '研究生学籍信息',
      isLogin: true
    }
  }
]

const router = new Router({
  routes: RouterList
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (local.get('USER_TOKEN') && to.name === 'Login') {
    next({ path: '/' })
  } else if (to.matched.some((res) => res.meta.isLogin)) {
    if (local.get('USER_TOKEN')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          //redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
export default router
