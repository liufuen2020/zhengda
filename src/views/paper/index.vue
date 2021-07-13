<template>
  <div class="resume">
    <div class="mainTitle">毕业论文信息</div>
    <div v-if="infoData && !infoData.id" class="noData">
      暂无数据
    </div>
    <div v-if="infoData && infoData.id" class="infoBox">
      <mt-cell title="姓名" :value="infoData.createBy"></mt-cell>
      <mt-cell title="学号" :value="infoData.xh"></mt-cell>
      <div class="line"></div>
      <div class="infoDetail">
        <div class="title">论文题目</div>
        <div class="con" v-html="infoData.lwtm"></div>
      </div>

      <div class="infoDetail">
        <div class="title">论文题目英文</div>
        <div class="con" v-html="infoData.lwywtm"></div>
      </div>
      <div class="infoDetail">
        <div class="title">论文关键词</div>
        <div class="con" v-html="infoData.lwgjc"></div>
      </div>
      <div class="infoDetail">
        <div class="title">论文摘要</div>
        <div class="con" v-html="infoData.lwzynr"></div>
      </div>
      <div class="infoDetail">
        <div class="title">论文起始年月</div>
        <div class="con" v-html="infoData.lwqsrq"></div>
      </div>
      <div class="infoDetail">
        <div class="title">论文结束年月</div>
        <div class="con" v-html="infoData.lwzzrq"></div>
      </div>
      <div class="infoDetail">
        <div class="title">论文类型</div>
        <div class="con" v-html="infoData.lwlxm"></div>
      </div>
      <div class="infoDetail">
        <div class="title">论文选题来源</div>
        <div class="con" v-html="infoData.lwxtlymc"></div>
      </div>
      <div class="infoDetail">
        <div class="title">论文密级</div>
        <div class="con" v-html="infoData.lwmjmmc"></div>
      </div>
      <div class="infoDetail">
        <div class="title">论文字数(万)</div>
        <div class="con" v-html="infoData.lwzs"></div>
      </div>
      <div class="infoDetail">
        <div class="title">研究方向</div>
        <div class="con" v-html="infoData.yjfx"></div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { xwlwxx } from '@/api'
import { Indicator } from 'mint-ui'

export default {
  name: 'resume',
  data() {
    return {
      infoData: '',
      zqkhData: ''
    }
  },
  methods: {
    getStudentClientInfo() {
      Indicator.open()
      request
        .get(xwlwxx, {})
        .then((res) => {
          Indicator.close()
          const r = res.data
          //this.getStudentClientQkhxxInfo()
          this.infoData = r.data || {}
        })
        .catch((err) => {})
    }
    // getStudentClientQkhxxInfo() {
    //   Indicator.open()
    //   request
    //     .get(zqkhxxInfo, {})
    //     .then((res) => {
    //       Indicator.close()
    //       const r = res.data
    //       if (r && r.data) {
    //         this.zqkhData = r.data || {}
    //       }
    //     })
    //     .catch((err) => {})
    // }
  },
  mounted() {
    this.getStudentClientInfo()
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/styles/base.less');
.resume {
  padding-bottom: (50 / @base);
  padding-top: (20 / @base);
  .infoBox {
    margin-top: (20 / @base);
  }
  .link {
    margin-left: (30 / @base);
  }
  .infoTable {
    padding-bottom: (15 / @base);
    padding-right: (15 / @base);
    table {
      width: 100%;
    }
    th,
    td {
      font-size: (24 / @base);
      color: #666;
      font-weight: normal;
      width: 25%;
      text-align: center;
      border: 1px solid #d9d9d9;
    }
    th {
      color: #999;
    }
  }
  .infoDetail {
    margin: (30 / @base) (20 / @base);
    .title {
      margin-bottom: (15 / @base);
    }
    .con {
      color: #888;
      line-height: (42 / @base);
    }
  }
}
</style>
