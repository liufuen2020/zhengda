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
        <a @click="detail(index)" class="link">详情</a>
      </mt-cell>
      <div></div>
      <div v-if="courseData[index].show" class="infoTable">
        <table>
          <tr>
            <th>学时</th>
            <td>{{ item.xs }}</td>
            <th>学分</th>
            <td>{{ item.xf }}</td>
          </tr>
          <tr>
            <th>修课要求</th>
            <td>{{ item.bxhxxmc }}</td>
            <th>是否学位课</th>
            <td>{{ item.sfxwkmc }}</td>
          </tr>
          <tr>
            <th>导师审核状态</th>
            <td>{{ item.kcshztmc }}</td>
            <th>课程类别</th>
            <td>{{ item.kclxmc }}</td>
          </tr>
          <tr>
            <th>审核意见</th>
            <td colspan="3">{{ item.shyj }}</td>
          </tr>
        </table>
      </div>
    </div>

    <div v-if="!!courseData" class="mainTitle g-mar-top30 g-mar-bottom20">培养过程</div>
    <div v-if="!!courseData" class="courseData" v-for="(item, index) in processData">
      <mt-cell :title="item.kcdm">
        <span>{{ item.kclxmc }}</span>
        <a @click="processDetail(index)" class="link">详情</a>
      </mt-cell>
      <div></div>
      <div v-if="processData[index].show" class="infoTable">
        <table>
          <tr>
            <th>学时</th>
            <td>{{ item.xs }}</td>
            <th>学分</th>
            <td>{{ item.xf }}</td>
          </tr>
          <tr>
            <th>修课要求</th>
            <td>{{ item.bxhxxmc }}</td>
            <th>是否学位课</th>
            <td>{{ item.sfxwkmc }}</td>
          </tr>
          <tr>
            <th>导师审核状态</th>
            <td>{{ item.kcshztmc }}</td>
            <th>课程类别</th>
            <td>{{ item.kclxmc }}</td>
          </tr>
          <tr>
            <th>审核意见</th>
            <td colspan="3">{{ item.shyj }}</td>
          </tr>
        </table>
      </div>
    </div>
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
      infoData: '',
      courseData: '',
      processData: ''
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
}
</style>
