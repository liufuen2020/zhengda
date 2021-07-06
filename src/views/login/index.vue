<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/logo.png" />
      <span>郑州大学研究生院统一身份验证</span>
    </div>

    <mt-field
      label="用户名"
      placeholder="请输入用户名"
      v-model="ajax.username"
    ></mt-field>
    <mt-field
      label="密码"
      placeholder="请输入密码"
      type="password"
      v-model="ajax.password"
    ></mt-field>
    <mt-field label="验证码" v-model="ajax.captcha">
      <img
        :src="'data:image/png;base64,' + captchaImg"
        height="45px"
        width="100px"
        @click="getCaptchaImg"
      />
    </mt-field>
    <mt-button type="primary" @click="sendLogin">登录</mt-button>
  </div>
</template>

<script>
import axios from "axios";
import { captcha, login } from "@/api";

export default {
  name: "HelloWorld",
  data() {
    return {
      captchaImg: "",
      ajax: {
        name: "",
        username: "",
        password: "",
        uuid: "",
        yzm: "",
        loginType: "",
        userType: "STUDENT",
        xxdm: "10459",
        isVirtual: false
      }
    };
  },
  methods: {
    sendLogin() {
      const payload = {
        name: "11111",
        password: "MTIzNDU2QWE=",
        yzm: "up8t",
        username: "11111",
        xxdm: "10459",
        loginType: "ACCOUNT",
        userType: "STUDENT",
        uuid: "969c817a-5ca5-4aa1-b4b8-ddd043ca71e6",
        isVirtual: false
      };
      axios({
        method: "post",
        url: login,
        data: payload,
        transformRequest: [
          function(data) {
            console.log(12331, data);
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            ret = ret.substring(0, ret.lastIndexOf("&"));
            return ret;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        console.log(23232, res);
      });
      console.log(123, this.ajax);
    },
    getCaptchaImg() {
      axios
        .get(captcha, {})
        .then(res => {
          if (res.data && res.data.data && res.data.data.img) {
            this.captchaImg = res.data.data.img;
            console.log(123, this.captchaImg);
          }
        })
        .catch(err => {
          console.log(456, err);
        });
    }
  },
  mounted() {
    console.log(11122, this.$store.state, this.ajax);
    this.getCaptchaImg();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.login {
  // img {
  //   width: 500px;
  // }
}
</style>
