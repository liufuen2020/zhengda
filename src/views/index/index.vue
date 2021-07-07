<template>
  <div class="index">
    <div class="square">
      <ul class="square-inner flex">
        <li v-for="item in listData" :key="item.id" @click="go(item.id)">
          <span :class="['iconBg', 'icon_' + item.id]"></span>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
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
      listData: [
        {
          name: '研究生学籍',
          id: '1'
        },
        {
          name: '培养计划',
          id: '2'
        },
        {
          name: '学生课表',
          id: '3'
        },
        {
          name: '学生总成绩单',
          id: '4'
        },
        {
          name: '开题报告信息',
          id: '5'
        },
        {
          name: '中期检查信息',
          id: '6'
        },
        {
          name: '预答辩信息',
          id: '7'
        },
        {
          name: '学生科研成果',
          id: '8'
        },
        {
          name: '毕业论文信息',
          id: '9'
        }
      ]
    }
  },
  methods: {
    go(id) {
      alert(id)
    }
  },
  mounted() {
    this.getCaptchaImg()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../assets/styles/base.less');
.index {
  padding-top: (250 / @base);
  background-image: url('../../assets/bg.png');
  background-repeat: no-repeat;
  background-size: (450 / @base) auto;
  background-position: (20 / @base) (-100 / @base);
  .square {
    position: relative;
    margin: 0 auto;
    width: 90%;
    height: 0;
    padding-bottom: 100%; /* padding百分比是相对父元素宽度计算的 */
    margin-bottom: 30px;
  }
  .square-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; /* 铺满父元素容器，这时候宽高就始终相等了 */
  }
  .square-inner > li {
    width: calc(98% / 3); /* calc里面的运算符两边要空格 */
    height: calc(98% / 3);
    margin-right: 1%;
    margin-bottom: 1%;
    overflow: hidden;
  }
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  .flex > li {
    flex-grow: 1; /* 子元素按1/n的比例进行拉伸 */
    //background-color: #4d839c;
    text-align: center;
    //color: #fff;
    font-weight: 500;
    line-height: 2;
    font-size: (32 / @base);
  }
  .flex > li:nth-of-type(3n) {
    /* 选择个数是3的倍数的元素 */
    margin-right: 0;
  }
  .flex > li:nth-of-type(n + 7) {
    /* 选择倒数的三个元素，n可以取0 */
    margin-bottom: 0;
  }
  .iconBg {
    border-radius: (5 / @base);
    margin: 0 auto 10px auto;
    display: block;
    width: (96 / @base);
    height: (96 / @base);
    background-image: url('../../assets/icon.png');
    background-repeat: no-repeat;
    background-size: (750 / @base) auto;
  }
  .icon_1 {
    background-position: (-181 / @base) (-376 / @base);
  }
  .icon_2 {
    background-position: (-34 / @base) (-220 / @base);
  }
  .icon_3 {
    background-position: (-618 / @base) (-532 / @base);
  }
  .icon_4 {
    background-position: (-618 / @base) (-66 / @base);
  }
  .icon_5 {
    background-position: (-34 / @base) (-840 / @base);
  }
  .icon_6 {
    background-position: (-180 / @base) (-994 / @base);
  }
  .icon_7 {
    background-position: (-472 / @base) (-530 / @base);
  }
  .icon_8 {
    background-position: (-36 / @base) (-376 / @base);
  }
  .icon_9 {
    background-position: (-34 / @base) (-66 / @base);
  }
}
</style>
