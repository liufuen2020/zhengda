<template>
  <div class="resume">
    <div v-if="resumeData && resumeData.length === 0" class="noData">
      暂无数据
    </div>
    <div v-if="resumeData && resumeData.length > 0" class="infoBox" v-for="(item, index) in resumeData">
      <mt-cell title="开始时间" :value="item.xxqsrq"></mt-cell>
      <mt-cell title="结束时间" :value="item.xxzzrq"></mt-cell>
      <mt-cell title="单位" :value="item.xxdw"></mt-cell>
      <mt-cell title="职务" :value="item.drzw"></mt-cell>
      <div class="line" v-if="resumeData.length - 1 != index"></div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { studentClientResumes } from '@/api'
import { Indicator } from 'mint-ui'

export default {
  name: 'resume',
  data() {
    return {
      resumeData: ''
    }
  },
  methods: {
    getStudentClientInfo() {
      // Indicator.open()
      request
        .get(studentClientResumes, {})
        .then((res) => {
          // Indicator.close()
          const r = res.data
          this.resumeData = r.data || []
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
@import url('../../../assets/styles/base.less');
.resume {
  padding-top: (120 / @base);
  .mint-cell-text {
  }
}
</style>
