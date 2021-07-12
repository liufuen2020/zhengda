import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import Router from 'vue-router'
import local from './localstorage'

let instance = axios.create({})
instance.interceptors.request.use(
  (config) => {
    const token = local.get('USER_TOKEN')
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token //请求头加上token
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

const router = new Router()
instance.interceptors.response.use(
  (response) => {
    //拦截响应，做统一处理
    if (response.data.status) {
      const status = response.data.status
      console.log(Router)
      switch (status) {
        case 403:
          local.clear()
          router.push({
            path: '/login'
            // query: {
            //   redirect: router.currentRoute.fullPath
            // }
          })
      }
    }
    return response
  },
  //接口错误状态处理，也就是说无响应时的处理
  (error) => {
    return Promise.reject(error.response.status) // 返回接口返回的错误信息
  }
)
export default instance
