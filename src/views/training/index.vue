<template>
  <div class="resume">
    <div class="mainTitle">培养计划信息</div>
    <div v-if="!!infoData" class="infoBox">
      <mt-cell title="姓名" :value="infoData.xm"></mt-cell>
      <mt-cell title="学号" :value="infoData.xh"></mt-cell>
      <mt-cell title="培养单位" :value="infoData.dwmc"></mt-cell>
      <mt-cell title="专业" :value="infoData.zymc"></mt-cell>
      <mt-cell title="年级" :value="infoData.sznj"></mt-cell>
      <mt-cell title="培养方案" :value="infoData.pyfamc"></mt-cell>
    </div>
    <div v-if="!!courseData" class="mainTitle g-mar-top30 g-mar-bottom20">培养计划课程</div>

    <div v-if="!!courseData" class="courseData" v-for="(item, index) in courseData">
      <mt-cell :title="item.kcdm">
        <span>{{ item.kclxmc }}</span>
        <a @click="detail(item)" class="link">详情</a>
      </mt-cell>
    </div>

    <div v-if="!!courseData" class="mainTitle g-mar-top30 g-mar-bottom20">培养过程</div>
    <div v-if="!!courseData" class="courseData" v-for="(item, index) in processData">
      <mt-cell :title="item.kcdm">
        <span>{{ item.kclxmc }}</span>
        <a @click="detail(item)" class="link">详情</a>
      </mt-cell>
    </div>

    <mt-popup position="right" class="mint-popup" v-model="popupVisible">
      <div class="popupCon">
        <mt-button @click="popupVisible = false" size="large" type="primary">关闭</mt-button>
        <mt-cell title="课程代码" :value="detailData.kcdm || '--'"></mt-cell>
        <mt-cell title="课程名称" :value="detailData.kclxmc || '--'"></mt-cell>
        <mt-cell title="学时" :value="detailData.xs || '--'"></mt-cell>
        <mt-cell title="学分" :value="detailData.xf || '--'"></mt-cell>
        <mt-cell title="修课要求" :value="detailData.bxhxxmc || '--'"></mt-cell>
        <mt-cell title="是否学位课" :value="detailData.sfxwkmc || '--'"></mt-cell>
        <mt-cell title="导师审核状态" :value="detailData.kcshztmc || '--'"></mt-cell>
        <mt-cell title="课程类别" :value="detailData.kclxmc || '--'"></mt-cell>
        <mt-cell title="审核意见" :value="detailData.shyj || '--'"></mt-cell>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import request from '@/utils/request'
import { infoByView } from '@/api'
import { Indicator } from 'mint-ui'

export default {
  name: 'resume',
  data() {
    return {
      detailData: '',
      infoData: '',
      courseData: '',
      processData: '',
      popupVisible: false
    }
  },
  methods: {
    getStudentClientInfo() {
      Indicator.open()
      request
        .get(infoByView, {})
        .then((res) => {
          Indicator.close()
          const r = res.data
          if (r && r.data) {
            this.infoData = r.data.pyjh || {}
            this.courseData = r.data.pyjhkcList || []
            this.processData = r.data.pyjhPkcList || []
          }
        })
        .catch((err) => {})
    },
    detail(item) {
      this.detailData = item
      this.popupVisible = true
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
}
</style>
