<template>
  <div class="login">
    <div class="logo">
      <span>郑州大学研究生院</span>
    </div>

    <div class="loginBox" v-if="loginTab === 1">
      <div>
        <mt-field
          label="用户名"
          placeholder="请输入用户名"
          v-model="ajax.username"
          :attr="{ maxlength: 50 }"
        ></mt-field>
        <mt-field
          label="密码"
          placeholder="请输入密码"
          :attr="{ maxlength: 50 }"
          type="password"
          v-model="ajax.password"
        ></mt-field>
        <mt-field label="验证码" v-model="ajax.yzm" placeholder="输入验证码">
          <img :src="'data:image/png;base64,' + captchaImg" height="45px" width="100px" @click="getCaptchaImg" />
        </mt-field>
        <mt-radio v-model="ajax.userType" :options="options" class="radio"> </mt-radio>
      </div>
    </div>

    <div class="loginBox" v-if="loginTab === 2">
      <div>
        <mt-field label="手机号" placeholder="请输入手机号" v-model.trim="sjh" :attr="{ maxlength: 11 }"></mt-field>
        <mt-field label="验证码" v-model.trim="telAjax.yzm" :attr="{ maxlength: 4 }" placeholder="输入验证码">
          <span class="link" @click="getTelCode" v-if="time === 0">获取验证码</span>
          <span v-if="time !== 0"> {{ time }}s</span>
        </mt-field>
        <mt-radio v-model="telAjax.userType" :options="options" class="radio"> </mt-radio>
      </div>
    </div>
    <div class="telTab" @click="telTab">
      <span>{{ loginTab === 2 ? '使用账号密码登录' : '使用手机号快捷登录' }}</span>
    </div>
    <div class="loginBtn" v-if="loginTab === 1"><mt-button type="primary" @click="sendLogin">登录</mt-button></div>
    <div class="loginBtn" v-if="loginTab === 2"><mt-button type="primary" @click="telLogin">登录</mt-button></div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { captcha, login, userInfo, sendSms } from '@/api'
import { Base64 } from 'js-base64'
import { Toast, Indicator } from 'mint-ui'
export default {
  name: 'HelloWorld',
  data() {
    return {
      loginTab: 2, // 1 账号登录，2 手机号快捷登录
      captchaImg: '',
      sjh: '',
      time: 0,
      telAjax: {
        username: '',
        yzm: '',
        password: 1,
        loginType: 'MOBILE',
        userType: 'STUDENT',
        uuid: ''
      },
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
        }
      ]
    }
  },
  methods: {
    /**
     * 提交登录
     * author fuen
     */
    sendLogin() {
      if (!this.ajax.username) {
        Toast({
          message: '请输入用户名',
          duration: 2000
        })
        return
      }

      if (!this.ajax.password) {
        Toast({
          message: '请输入密码',
          duration: 2000
        })
        return
      }

      if (!this.ajax.yzm) {
        Toast({
          message: '请输入验证码',
          duration: 2000
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
        Indicator.close()
        const r = res.data || {}
        this.getCaptchaImg()
        if (r.msg) {
          Toast({
            message: r.msg,
            duration: 2000
          })
        }
        if (r.status === 1 && r.token) {
          this.getUserInfo(r.token)
        }
      })
    },
    /**
     * 获取用户信息 写入localStorage
     * author fuen
     */
    getUserInfo(token) {
      request
        .get(`${userInfo}/${token}`, {})
        .then((res) => {
          const r = res.data
          if (r && r.data && r.status === 1) {
            this.$store.commit('account/setToken', r.data.token)
            this.$store.commit('account/setUser', r.data.user)
            this.$router.push({ path: '/', query: { from: this.ajax.userType } })
          }
        })
        .catch((err) => {
          console.log(456, err)
        })
    },
    /**
     * 获取图片验证码
     * author fuen
     */
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
    },

    /**
     * 获取手机验证码
     * author fuen
     */
    getTelCode() {
      if (!this.sjh || this.sjh.length !== 11) {
        Toast({
          message: '请输入正确手机号',
          duration: 2000
        })
        return
      }

      request({
        method: 'post',
        url: sendSms,
        data: { sjh: this.sjh, userType: this.ajax.userType },
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
        Indicator.close()
        const r = res.data || {}

        if (r.msg) {
          Toast({
            message: r.msg,
            duration: 2000
          })
        }
        if (r.status === 1) {
          this.time = 60
          let interval = window.setInterval(() => {
            if (this.time-- <= 0) {
              this.time = 0
              window.clearInterval(interval)
            }
          }, 1000)
          this.telAjax.uuid = (r.data && r.data.uuid) || ''
        }
      })
    },
    /**
     * 手机号快捷登录
     * author fuen
     */
    telLogin() {
      if (!this.sjh) {
        Toast({
          message: '请输入手机号',
          duration: 2000
        })
        return
      }

      if (!this.telAjax.yzm) {
        Toast({
          message: '请输入验证码',
          duration: 2000
        })
        return
      }

      const payload = {
        ...this.telAjax,
        username: this.sjh
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
        Indicator.close()
        const r = res.data || {}
        this.getCaptchaImg()
        if (r.msg) {
          Toast({
            message: r.msg,
            duration: 2000
          })
        }
        if (r.status === 1 && r.token) {
          this.getUserInfo(r.token)
        }
      })
    },
    /**
     * 切换登录方式
     * author fuen
     */
    telTab() {
      if (this.loginTab === 1) {
        this.loginTab = 2
      } else {
        this.loginTab = 1
      }
    }
  },
  mounted() {
    this.getCaptchaImg()
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/styles/base.less');
.login {
  height: 100%;
  background-image: url('../../assets/loginBg.png');
  background-repeat: no-repeat;
  background-size: (750 / @base);
}
.loginBox {
  padding: (30 / @base);
  opacity: 0.8;
  margin: (100 / @base) (30 / @base) (50 / @base) (30 / @base);
  background: #fff;
  border-radius: (11 / @base);
}
.loginBtn {
  text-align: center;
}
.login .radio .mint-cell {
  float: left;
}
.telTab {
  text-align: right;
  color: rgb(209, 204, 255);
  margin-right: (35 / @base);
  opacity: 0.7;
  font-size: (26 / @base);
}
</style>
