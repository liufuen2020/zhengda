<template>
  <div class="resume">
    <div class="mainTitle">开题报告信息</div>
    <div v-if="!!infoData" class="infoBox">
      <mt-cell title="学号" :value="infoData.xh || '--'"></mt-cell>
      <mt-cell title="姓名" :value="infoData.xm || '--'"></mt-cell>
      <mt-cell title="院系" :value="infoData.dwmc || '--'"></mt-cell>
      <mt-cell title="专业" :value="infoData.zymc || '--'"></mt-cell>
      <mt-cell title="研究方向" :value="infoData.yjfx || '--'"></mt-cell>
      <mt-cell title="学生类别" :value="infoData.xslbmc || '--'"></mt-cell>
      <mt-cell title="入学年月">
        <span>{{ infoData.rxny && this.$moment(infoData.rxny).format('YYYY-MM-DD') }}</span>
      </mt-cell>
      <mt-cell title="导师姓名" :value="infoData.dsxm || '--'"></mt-cell>
      <mt-cell title="平均绩点">{{ infoData.pjjd }}</mt-cell>
      <mt-cell title="课程学习情况">已修{{ infoData.yxxf || 0.0 }}学分</mt-cell>
      <mt-cell title="有无重修课程">{{ infoData.ywcxkc }}</mt-cell>
      <mt-cell title="拟定论文题目">{{ infoData.ndlwtm }}</mt-cell>
      <mt-cell title="题目来源">{{ infoData.tmly }}</mt-cell>
      <mt-cell title="是否不宜公开">{{ infoData.sfsmmc }}</mt-cell>

      <div class="itemBox">
        <div class="title">选题依据及意义</div>
        <p v-html="infoData.xtyy && infoData.xtyy.replace(/\n|\r\n/g, '<br/>')"></p>
      </div>

      <div class="itemBox">
        <div class="title">所要解决的主要问题及研究途径与方法（预期思路与技术路线）</div>
        <p v-html="infoData.yqsl && infoData.yqsl.replace(/\n|\r\n/g, '<br/>')"></p>
      </div>

      <div class="itemBox">
        <div class="title">研究进度及具体时间安排</div>
        <div v-if="infoData && infoData.yjjds" v-for="(item, index) in infoData.yjjds">
          <mt-cell title="起讫日期" :value="item.qsrq || '--'"></mt-cell>
          <mt-cell title="研究内容" :value="item.zyyjnr || '--'"></mt-cell>
          <mt-cell title="预期结果" :value="item.yqjg || '--'"></mt-cell>
          <div class="line" v-if="infoData.yjjds.length - 1 != index"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { ktbgInfo } from '@/api'
import { Indicator } from 'mint-ui'

export default {
  name: 'resume',
  data() {
    return {
      infoData: ''
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
          if (r && r.data) {
            this.infoData = r.data
          }
        })
        .catch((err) => {})
    },
    detail(index) {
      const show = this.courseData[index].show !== true ? true : false
      this.$set(this.courseData, index, { ...this.courseData[index], show: show })
    },
    processDetail(index) {
      const show = this.processData[index].show !== true ? true : false
      this.$set(this.processData, index, { ...this.processData[index], show: show })
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
  .itemBox {
    .title {
      font-weight: 500;
      margin-bottom: (10 / @base);
    }
    padding: (20 / @base) (15 / @base);
    p {
      font-weight: normal;
    }
  }
}
</style>
