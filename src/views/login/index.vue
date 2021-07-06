<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/logo.png" />
      <span>郑州大学研究生院统一身份验证</span>
    </div>

    <mt-field label="用户名" placeholder="请输入用户名" v-model="ajax.username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="ajax.password"></mt-field>
    <mt-field label="验证码" v-model="ajax.captcha">
      <img :src="'data:image/png;base64,' + captchaImg" height="45px" width="100px" @click="getCaptchaImg" />
    </mt-field>
    <mt-button type="primary" @click="sendLogin">登录</mt-button>
  </div>
</template>

<script>
import axios from 'axios'
import { captcha, login } from '@/api'
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
        loginType: '',
        userType: 'STUDENT',
        xxdm: '10459',
        isVirtual: false
      }
    }
  },
  methods: {
    sendLogin() {
      const payload = {
        ...this.ajax
      }
      axios({
        method: 'post',
        url: login,
        data: payload,
        transformRequest: [
          function(data) {
            console.log(12331, data)
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
        if (res.status * 1 === 0 && res.msg) {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 5000
          })
        }
        console.log(23232, res)
      })
      console.log(123, this.ajax)
    },
    getCaptchaImg() {
      axios
        .get(captcha, {})
        .then((res) => {
          if (res.data && res.data.data && res.data.data.img) {
            this.captchaImg = res.data.data.img
            console.log(123, res.data)
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
<style scoped lang="less"></style>
