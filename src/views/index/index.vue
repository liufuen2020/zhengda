<template>
  <div class="index">ww</div>
</template>

<script>
import request from '@/utils/request'
import { captcha, login, userInfo } from '@/api'
import { Base64 } from 'js-base64'
import { Toast } from 'mint-ui'
export default {
  name: 'index',
  data() {
    return {
      captchaImg: '',
      ajax: {
        name: '',
        username: '',
        password: '',
        uuid: '',
        yzm: '',
        loginType: 'ACCOUNT',
        userType: 'STUDENT',
        xxdm: '10459',
        isVirtual: false
      },
      options: [
        {
          label: '学生端',
          value: 'STUDENT'
        },
        {
          label: '教师端',
          value: 'TEACHER'
        },
        {
          label: '管理端',
          value: 'SYSTEM'
        }
      ]
    }
  },
  methods: {
    sendLogin() {
      if (!this.ajax.username) {
        Toast({
          message: '请输入用户名',
          duration: 5000
        })
        return
      }

      if (!this.ajax.password) {
        Toast({
          message: '请输入密码',
          duration: 5000
        })
        return
      }

      if (!this.ajax.yzm) {
        Toast({
          message: '请输入验证码',
          duration: 5000
        })
        return
      }

      const payload = {
        ...this.ajax,
        password: Base64.encode(this.ajax.password),
        name: this.ajax.username
      }
      request({
        method: 'post',
        url: login,
        data: payload,
        transformRequest: [
          function(data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0, ret.lastIndexOf('&'))
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        const r = res.data || {}
        this.getCaptchaImg()
        if (r.msg) {
          Toast({
            message: res.msg,
            duration: 5000
          })
        }
        if (r.status === 1 && r.token) {
          this.getUserInfo(r.token)
        }
      })
    },

    getUserInfo(token) {
      request
        .get(`${userInfo}/${token}`, {})
        .then((res) => {
          const r = res.data
          if (r && r.data && r.status === 1) {
            this.$store.commit('account/setToken', r.data.token)
          }
        })
        .catch((err) => {
          console.log(456, err)
        })
    },

    getCaptchaImg() {
      request
        .get(captcha, {})
        .then((res) => {
          const r = res.data
          if (r && r.data && r.data.img) {
            this.captchaImg = res.data.data.img
            this.ajax.uuid = res.data.data.uuid
          }
        })
        .catch((err) => {
          console.log(456, err)
        })
    }
  },
  mounted() {
    // console.log(11122, this.$store.state, this.ajax)
    this.getCaptchaImg()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login .radio .mint-cell {
  float: left;
}
</style>
