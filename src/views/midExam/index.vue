<template>
  <div class="resume">
    <div class="mainTitle">中期考核信息</div>
    <div v-if="!!infoData" class="infoBox">
      <mt-cell title="姓名" :value="infoData.xm"></mt-cell>
      <mt-cell title="学号" :value="infoData.xh"></mt-cell>
      <mt-cell title="学生类别" :value="infoData.xslbmc"></mt-cell>
      <mt-cell title="院系" :value="infoData.dwmc"></mt-cell>
      <mt-cell title="专业" :value="infoData.zymc"></mt-cell>
      <mt-cell title="研究方向" :value="infoData.pyfx || '--'"></mt-cell>
      <mt-cell title="导师姓名" :value="infoData.dsxm"></mt-cell>
      <div class="line"></div>
      <div v-if="zqkhData.grpzzj" class="infoDetail">
        <div class="title">一、思想品德、行为表现、综合素质</div>
        <div class="con" v-html="zqkhData.grpzzj"></div>
      </div>
      <div v-if="zqkhData.kyqkzj" class="infoDetail">
        <div class="title">二、参加科研项目、学术会议及发表论文情况</div>
        <div class="con" v-html="zqkhData.kyqkzj"></div>
      </div>
      <div v-if="zqkhData.jlqk" class="infoDetail">
        <div class="title">三、奖惩情况</div>
        <div class="con" v-html="zqkhData.jlqk"></div>
      </div>
      <div v-if="zqkhData.sxzk" class="infoDetail">
        <div class="title">四、身心状况</div>
        <div class="con" v-html="zqkhData.sxzk"></div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { zqkhxxInfo, ktbgInfo } from '@/api'
import { Indicator } from 'mint-ui'
import local from '@/utils/localstorage'

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
        .get(ktbgInfo, {})
        .then((res) => {
          Indicator.close()
          const r = res.data
          this.getStudentClientQkhxxInfo()
          if (r && r.data) {
            this.infoData = r.data || {}
          }
        })
        .catch((err) => {})
    },
    getStudentClientQkhxxInfo() {
      Indicator.open()
      request
        .get(zqkhxxInfo, {})
        .then((res) => {
          Indicator.close()
          const r = res.data
          if (r && r.data) {
            this.zqkhData = r.data || {}
          }
        })
        .catch((err) => {})
    }
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
