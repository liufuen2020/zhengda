import Vue from 'vue'
import Router from 'vue-router'
import local from '@/utils/localstorage'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login'
import Index from '@/views/index'
import UserInfo from '@/views/userInfo'
import Training from '@/views/training'
import Opening from '@/views/opening'
import Research from '@/views/research'
import MidExam from '@/views/midExam'
import Reply from '@/views/reply'
import StudentCourse from '@/views/studentCourse'

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
  },
  {
    path: '/index/training', // 培养计划
    name: 'training',
    component: Training,
    meta: {
      title: '培养计划',
      isLogin: true
    }
  },
  {
    path: '/index/opening', // 开题报告
    name: 'opening',
    component: Opening,
    meta: {
      title: '开题报告',
      isLogin: true
    }
  },
  {
    path: '/index/opening', // 开题报告
    name: 'opening',
    component: Opening,
    meta: {
      title: '开题报告',
      isLogin: true
    }
  },
  {
    path: '/index/research', // 科研成果信息管理
    name: 'research',
    component: Research,
    meta: {
      title: '科研成果信息管理',
      isLogin: true
    }
  },
  {
    path: '/index/midexam', // 中期考核
    name: 'midExam',
    component: MidExam,
    meta: {
      title: '中期检查信息',
      isLogin: true
    }
  },
  {
    path: '/index/reply', // 预答辩
    name: 'reply',
    component: Reply,
    meta: {
      title: '预答辩',
      isLogin: true
    }
  },
  {
    path: '/index/studentCourse', // 课程表
    name: 'studentCourse',
    component: StudentCourse,
    meta: {
      title: '课程表',
      isLogin: true
    }
  }
]

const router = new Router({
  routes: RouterList
})
// local.set(
//   'USER_TOKEN',
//   'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0YjJmYjgzYTIyNmRjNGYyNWNiMGFiZTBjOTQ2MTY4MyIsImV4cCI6MTYyNjA2MzA0MywiaWF0IjoxNjI1OTc2NjQzfQ.tWJrf58DjNlEHe968Y0DqY5Py19nyP6FXnC9JcSmZD50Riu5OFaqq_5TTaFk8yQD_wx0rCrtFMs6T1sk72BqMw'
// )
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
