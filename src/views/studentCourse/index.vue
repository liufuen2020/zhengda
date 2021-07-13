<template>
  <div class="studentCourse">
    <div class="mainTitle">学生课表信息</div>

    <!-- <div class="selectBox g-mar-top20">
      开课学年：<select v-model="ajax.kkxn" @change="selectType">
        <option v-for="item in yearData" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="selectBox">
      开课学期：<select v-model="ajax.kkxqm" @change="selectType">
        <option v-for="item in kkxqmData" :value="item.code">{{ item.name }}</option>
      </select>
    </div> -->
    <ul class="g-inputList searchlayer">
      <li>
        <div class="g-inputlist-title">考试学年</div>
        <div class="g-inputlist-content">
          <select v-model="ajax.kkxn">
            <option :value="item" v-for="item in yearData">{{ item }}</option>
          </select>
        </div>
      </li>
      <li>
        <div class="g-inputlist-title">开课学期</div>
        <div class="g-inputlist-content">
          <select v-model="ajax.kkxqm">
            <option :value="item.code" v-for="item in kkxqmData">{{ item.name }}</option>
          </select>
        </div>
      </li>
    </ul>

    <div class="week" v-if="weekData" v-for="(item, index) in week">
      <div class="title">{{ item.value }}</div>
      <table>
        <tr>
          <th>1-2</th>
          <td>
            <p v-if="weekData[0] && weekData[0][item.name]" v-for="(items, index) in weekData[0][item.name]">
              {{ items.kcmc }}
              <span
                >{{ items.ksz }}-{{ items.jsz }}({{ items.skzlxmc }} ) {{ items.rkjsmc }} {{ items.classroomNo }}</span
              >
            </p>
          </td>
        </tr>
        <tr>
          <th>3-4</th>
          <td>
            <p v-if="weekData[1] && weekData[1][item.name]" v-for="(items, index) in weekData[1][item.name]">
              {{ items.kcmc }}
              <span
                >{{ items.ksz }}-{{ items.jsz }}({{ items.skzlxmc }} ) {{ items.rkjsmc }} {{ items.classroomNo }}</span
              >
            </p>
          </td>
        </tr>
        <tr>
          <th>5-6</th>
          <td>
            <p v-if="weekData[2] && weekData[2][item.name]" v-for="(items, index) in weekData[2][item.name]">
              {{ items.kcmc }}
              <span
                >{{ items.ksz }}-{{ items.jsz }}({{ items.skzlxmc }} ) {{ items.rkjsmc }} {{ items.classroomNo }}</span
              >
            </p>
          </td>
        </tr>
        <tr>
          <th>7-8</th>
          <td>
            <p v-if="weekData[3] && weekData[3][item.name]" v-for="(items, index) in weekData[3][item.name]">
              {{ items.kcmc }}
              <span
                >{{ items.ksz }}-{{ items.jsz }}({{ items.skzlxmc }} ) {{ items.rkjsmc }} {{ items.classroomNo }}</span
              >
            </p>
          </td>
        </tr>
        <tr>
          <th>9-10</th>
          <td>
            <p v-if="weekData[4] && weekData[4][item.name]" v-for="(items, index) in weekData[0][item.name]">
              {{ items.kcmc }}
              <span
                >{{ items.ksz }}-{{ items.jsz }}({{ items.skzlxmc }} ) {{ items.rkjsmc }} {{ items.classroomNo }}</span
              >
            </p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { querySelectedPkxxTable, TYPE0125, TYPE0072 } from '@/api'
import { Indicator } from 'mint-ui'

export default {
  name: 'resume',
  data() {
    return {
      yearData: [],
      kkxqmData: [],
      week: [
        { name: 'week1', value: '星期一' },
        { name: 'week2', value: '星期二' },
        { name: 'week3', value: '星期三' },
        { name: 'week4', value: '星期四' },
        { name: 'week5', value: '星期五' },
        { name: 'week6', value: '星期六' },
        { name: 'week7', value: '星期日' }
      ],
      ajax: {
        kkxqm: '',
        kkxn: ''
      },
      weekData: ''
    }
  },
  methods: {
    getStudentClientInfo() {
      Indicator.open()
      request({
        method: 'post',
        url: querySelectedPkxxTable,
        data: this.ajax,
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
      })
        .then((res) => {
          Indicator.close()
          const r = res.data
          if (r && r.data) {
            this.weekData = r.data.courseList || []
          }
        })
        .catch((err) => {})
    },
    onValuesChange(picker, values) {
      console.log(values)
    },
    getTYPE0125() {
      request
        .get(TYPE0125, {})
        .then((res) => {
          const r = res.data
          if (r && r.data) {
            r.data.map((item) => {
              this.yearData.push(item.name)
            })
            this.ajax.kkxn = this.yearData[0]
          }
        })
        .catch((err) => {})
    },
    getTYPE0072() {
      request
        .get(TYPE0072, {})
        .then((res) => {
          const r = res.data
          if (r && r.data) {
            this.kkxqmData = r.data
            this.ajax.kkxqm = r.data[0].code
          }
        })
        .catch((err) => {})
    }
  },
  mounted() {
    this.$watch('ajax.kkxqm', function() {
      if (this.ajax.kkxn && this.ajax.kkxqm) {
        this.getStudentClientInfo()
      }
    })
    this.$watch('ajax.kkxn', function() {
      if (this.ajax.kkxn && this.ajax.kkxqm) {
        this.getStudentClientInfo()
      }
    })
    this.getTYPE0125()
    this.getTYPE0072()
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/styles/base.less');
.studentCourse {
  padding-top: (20 / @base);
  padding-bottom: (20 / @base);
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
  .week {
    margin: (20 / @base) (15 / @base);
    .title {
      padding-left: (10 / @base);
      line-height: (50 / @base);
      background: #517fbd;
      color: #fff;
    }
    table {
      margin-top: (10 / @base);
      width: 100%;
    }
    th,
    td {
      font-size: (24 / @base);
      color: #666;
      font-weight: normal;
      width: 85%;
      text-align: center;
      border: 1px solid #d9d9d9;
      p {
        margin: (5 / @base);
        text-align: left;
        span {
          font-size: (24 / @base);
          color: #999;
        }
      }
    }
    th {
      width: 15%;
      color: #999;
    }
  }
  select {
    border: none;
    background: none;
    font-size: inherit;
    width: 100%;
  }
  .searchlayer {
    padding: (30 / @base) (15 / @base);
  }
}
</style>
