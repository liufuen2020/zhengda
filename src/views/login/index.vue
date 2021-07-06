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
import axios from 'axios'
import { captcha, login } from '@/api'
import { Base64 } from 'js-base64'
import { Toast } from 'mint-ui'
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
      axios({
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
      }).then((data) => {
        const res = data.data || {}
        this.getCaptchaImg()
        if (res.msg) {
          Toast({
            message: res.msg,
            duration: 5000
          })
        }
        console.log(23232, res)
      })
    },
    getCaptchaImg() {
      axios
        .get(captcha, {})
        .then((res) => {
          if (res.data && res.data.data && res.data.data.img) {
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
    console.log(11122, this.$store.state, this.ajax)
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
