import axios from 'axios'
import {message, Modal, notification} from 'ant-design-vue'
import moment from 'moment'
import store from '../store'
import db from 'utils/localstorage'
import {changeDate} from 'utils/common'

moment.locale('zh-cn')

// 统一配置
let FEBS_REQUEST = axios.create({
  // baseURL: 'http://test.ezmate.cn',
  // baseURL: 'http://192.168.98.51:8080',
  // baseURL: 'http://192.168.212.137:8080',
  baseURL: '/api',
  // responseType: 'json',
  // baseURL: 'http://service.ezmate.cn/api',
  validateStatus (status) {
    // 200 外的状态码都认定为失败
    return status === 200
  }
})

// 拦截请求
FEBS_REQUEST.interceptors.request.use((config) => {
  let expireTime = store.state.account.expireTime
  let now = moment().format('YYYYMMDDHHmmss')
  // 让token早10秒种过期，提升“请重新登录”弹窗体验
  if (now - expireTime >= -10) {
    return new Promise((resolve, reject) => {
      db.clear()
      location.reload()
      resolve()
    })
    // Modal.error({
    //   title: '登录已过期',
    //   content: '很抱歉，登录已过期，请重新登录',
    //   okText: '重新登录',
    //   mask: false,
    //   onOk: () => {
    //     return new Promise((resolve, reject) => {
    //       db.clear()
    //       location.reload()
    //       resolve()
    //     })
    //   }
    // })
  }
  // 有 token就带上
  if (store.state.account.token) {
    config.headers.Authorization = store.state.account.token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 拦截响应
FEBS_REQUEST.interceptors.response.use((res) => {
  let data = res.data
  if (data instanceof Blob) {
    return res
  }
  if (data.status === 1) {
    changeDate(data.data)
    return data
  } else {
    showError({status: data.status, msg: data.msg})
    return Promise.reject(data)
  }
}, (error) => {
  if (error.response) {
    let errorMessage = '系统内部异常，请联系综合办'
    if (error.response.data && error.response.data instanceof Blob) {
      let reader = new FileReader()
      reader.addEventListener('loadend', function () {
        let jsonResult = JSON.parse(reader.result)
        errorMessage = jsonResult.msg
        showError({status: error.response.status, msg: errorMessage})
      })
      reader.readAsText(error.response.data, 'utf-8')
    } else {
      errorMessage = error.response.data === null ? '系统内部异常，请联系综合办' : error.response.data.msg
      showError({status: error.response.status, msg: errorMessage})
    }
  }
  return Promise.reject(error)
})
let showError = (error) => {
  switch (error.status) {
    case 404:
      notification.error({
        message: '系统提示',
        description: '很抱歉，资源未找到',
        duration: 4
      })
      break
    case 403:
      return new Promise((resolve, reject) => {
        db.clear()
        location.reload()
        resolve()
      })
      // Modal.error({
      //   title: '登录已过期',
      //   content: '很抱歉，登录已过期，请重新登录',
      //   okText: '重新登录',
      //   mask: false,
      //   onOk: () => {
      //     return new Promise((resolve, reject) => {
      //       db.clear()
      //       location.reload()
      //       resolve()
      //     })
      //   }
      // })
      break
    case 401:
      notification.warn({
        message: '系统提示',
        description: '很抱歉，您无法访问该资源，可能是因为没有相应权限或者登录已失效',
        duration: 4
      })
      this.$router.push('/exception/401')
      break
    default:
      notification.error({
        message: '系统提示',
        description: error.msg,
        duration: 4
      })
      break
  }
}
const request = {
  post (url, params) {
    if (!params) {
      params = {}
    }
    return FEBS_REQUEST.post(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  postJson (url, params) {
    if (!params) {
      params = {}
    }
    return FEBS_REQUEST.post(url, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  put (url, params) {
    if (!params) {
      params = {}
    }
    return FEBS_REQUEST.put(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  get (url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return FEBS_REQUEST.get(`${url}${_params}`)
  },
  delete (url, params) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (let key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return FEBS_REQUEST.delete(`${url}${_params}`)
  },
  export (url, params = {}) {
    message.loading('导出数据中', 0)
    return FEBS_REQUEST.post(url, params, {
      transformRequest: [(params) => {
        let result = ''
        Object.keys(params).forEach((key) => {
          if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
            result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
          }
        })
        return result
      }],
      responseType: 'blob'
    }).then((r) => {
      try {
        message.destroy()
        console.dir(r.headers)
        console.dir(r)
        const content = r.data
        const blob = new Blob([content])
        console.log(blob)
        var fileName = '文件.pdf'
        if (r.headers['content-disposition']) {
          fileName = decodeURI(r.headers['content-disposition'].split('filename=')[1])
        }
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, fileName)
        }
      } catch (error) {
        console.log(error)
      }

    }).catch((r) => {
      message.destroy()
      // message.error('导出失败')
    })
  },
  download (url, params) {
    message.loading('文件传输中')
    return FEBS_REQUEST.get(url, params, {
      transformRequest: [(params) => {
        let result = ''
        if(params){
          Object.keys(params).forEach((key) => {
            if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
              result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
            }
          })
        }
        return result
      }],
      responseType: 'blob',
    }).then((r) => {
      console.log(r)
      const content = r.data
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
    }).catch((res) => {
      const link = document.createElement('a')
      const body = document.querySelector('body')
      link.href = window.URL.createObjectURL(res)
      link.download = name
      link.style.display = 'none'
      body.appendChild(link)
      link.click()
      body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
      // const content = r.data
      // const blob = new Blob([content])
      // if ('download' in document.createElement('a')) {
      //   const elink = document.createElement('a')
      //   elink.download = '文件'
      //   elink.style.display = 'none'
      //   elink.href = URL.createObjectURL(blob)
      //   document.body.appendChild(elink)
      //   elink.click()
      //   URL.revokeObjectURL(elink.href)
      //   document.body.removeChild(elink)
      // } else {
      //   navigator.msSaveBlob(blob, filename)
      // }
      // console.log(r)
      // message.error('下载失败')
    })
  },
  downloadPdf (url, params, filename) {
    message.loading('文件传输中')
    return FEBS_REQUEST.post(url, params, {
      transformRequest: [(params) => {
        let result = ''
        if(params){
          Object.keys(params).forEach((key) => {
            if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
              result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
            }
          })
        }
        return result
      }],
      responseType: 'blob',
    }).then((r) => {
      console.log(r)
      const content = r.data
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
    }).catch((r) => {
      // message.error('下载失败')
    })
  },
  uploadToDow (url, params) {
    if (!params) {
      params = {}
    }
    return FEBS_REQUEST.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob',
    }).then((r) => {
        console.dir(r.headers)
        console.dir(r)
        const content = r.data
        const blob = new Blob([content])
        console.log(blob)
        var fileName = '.xlsx'
        if (r.headers['content-disposition']) {
          fileName = decodeURI(r.headers['content-disposition'].split('filename=')[1])
        }else{
          return r
        }
        console.log(fileName)
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, fileName)
        }
        // return r
    })
  },
  postToDow (url, params) {
    if (!params) {
      params = {}
    }
    return FEBS_REQUEST.post(url, params, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'blob',
    }).then((r) => {
        console.dir(r.headers)
        console.dir(r)
        const content = r.data
        const blob = new Blob([content])
        console.log(blob)
        var fileName = '.xlsx'
        if (r.headers['content-disposition']) {
          fileName = decodeURI(r.headers['content-disposition'].split('filename=')[1])
        }else{
          return r
        }
        console.log(fileName)
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
        } else {
          navigator.msSaveBlob(blob, fileName)
        }
        // return r
    })
  },
  upload (url, params) {
    if (!params) {
      params = {}
    }
    return FEBS_REQUEST.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
  },
  exportUpload (url, params = {}) {
    message.loading('导出数据中', 0)
    return FEBS_REQUEST.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    }).then((res) => {
      message.destroy()
      console.log(res)
      const link = document.createElement('a')
      let blob = new Blob([res.data],{type: 'application/vnd.ms-excel'});
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob);
      let num = ''
      for(let i=0;i < 10;i++){
        num += Math.ceil(Math.random() * 10)
      }
      link.setAttribute('download', '二志愿考生异常.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }).catch(error => {
      message.destroy()
      // this.$Notice.error({
      //   title: '错误',
      //   desc: '网络连接错误'
      // })
      console.log(error)
    })

  },
}

export default request
