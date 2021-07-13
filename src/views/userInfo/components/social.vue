<template>
  <div class="resume">
    <div v-if="resumeData && resumeData.length === 0" class="noData">
      暂无数据
    </div>

    <div v-if="resumeData && resumeData.length > 0" class="infoBox" v-for="(item, index) in resumeData">
      <mt-cell title="姓名" :value="item.cyxm"></mt-cell>
      <mt-cell title="出生日期" :value="item.csny"></mt-cell>
      <mt-cell title="与本人关系" :value="item.gxmc"></mt-cell>
      <mt-cell title="工作单位" :value="item.cygzdw"></mt-cell>
      <mt-cell title="职务" :value="item.cymc"></mt-cell>
      <mt-cell title="政治面貌" :value="item.zzmmmc"></mt-cell>
      <div class="line" v-if="resumeData.length - 1 != index"></div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { studentClientFamillys } from '@/api'
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
      //Indicator.open()
      request
        .get(studentClientFamillys, {})
        .then((res) => {
          //Indicator.close()
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
}
</style>
