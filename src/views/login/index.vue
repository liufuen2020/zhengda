<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/logo.png" />
      <span>郑州大学研究生院统一身份验证</span>
    </div>
    <div>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="ajax.username" :attr="{ maxlength: 50 }"></mt-field>
      <mt-field
        label="密码"
        placeholder="请输入密码"
        :attr="{ maxlength: 50 }"
        type="password"
        v-model="ajax.password"
      ></mt-field>
      <mt-field label="验证码" v-model="ajax.yzm">
        <img :src="'data:image/png;base64,' + captchaImg" height="45px" width="100px" @click="getCaptchaImg" />
      </mt-field>
      <mt-radio v-model="ajax.userType" :options="options" class="radio"> </mt-radio>
      <mt-button type="primary" @click="sendLogin">登录</mt-button>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { captcha, login, userInfo } from '@/api'
import { Base64 } from 'js-base64'
import { Toast, Indicator } from 'mint-ui'
export default {
  name: 'HelloWorld',
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
      Indicator.open()
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
        alert(1)
        Indicator.close()
        const r = res.data || {}
        this.getCaptchaImg()
        if (r.msg) {
          Toast({
            message: r.msg,
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
            this.$router.push({ path: '/', query: { from: this.ajax.userType } })
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
