<template>
  <div class="achievement">
    <div class="mainTitle">学生总成绩单</div>
    <div class="topBtn"><mt-button @click="popupVisible2 = true" size="large" type="primary">条件查询</mt-button></div>
    <mt-loadmore
      v-if="infoData"
      :auto-fill="false"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <ul class="list">
        <li v-for="(item, index) in infoData" @click="goDetail(item)">
          <span class="key">{{ index + 1 }}</span>
          <div class="con">{{ item.cjlrrbh }} {{ item.kcmc }}}</div>
          <span class="go link">&gt;</span>
        </li>
      </ul>
    </mt-loadmore>
    <mt-popup position="right" class="mint-popup" v-model="popupVisible">
      <div class="popupCon">
        <mt-button @click="popupVisible = false" size="large" type="primary">关闭</mt-button>
        <mt-cell title="课程代码" :value="detailData.cjlrrbh || '--'"></mt-cell>
        <mt-cell title="课程名称" :value="detailData.kcmc || '--'"></mt-cell>
        <mt-cell title="开课院系" :value="detailData.kkyxmc || '--'"></mt-cell>
        <mt-cell title="考试学年" :value="detailData.ksxqmc || '--'"></mt-cell>
        <mt-cell title="考试学期" :value="detailData.ksxqmc || '--'"></mt-cell>
        <mt-cell title="考试性质" :value="detailData.ksxzmc || '--'"></mt-cell>
        <mt-cell title="考试类别" :value="detailData.kslbmc || '--'"></mt-cell>
        <mt-cell title="成绩" :value="detailData.kscj || '--'"></mt-cell>
        <mt-cell title="成绩类型" :value="detailData.cjlxmc || '--'"></mt-cell>
        <mt-cell title="学分" :value="detailData.kcxf || '--'"></mt-cell>
        <mt-cell
          title="考试日期"
          :value="(detailData.ksrq && this.$moment(detailData.ksrq).format('YYYY-MM-DD')) || '--'"
        ></mt-cell>
        <mt-cell title="成绩状态" :value="detailData.cjztmc || '--'"></mt-cell>
        <mt-cell title="修课状态" :value="detailData.xkztmc || '--'"></mt-cell>
        <mt-cell title="备注" :value="detailData.note || '--'"></mt-cell>
      </div>
    </mt-popup>
    <mt-popup v-model="popupVisible2" position="top" class="mint-popup2">
      <mt-cell title="考试学年">
        <select>
          <option>232324</option>
          <option>232324</option>
          <option>232324</option>
          <option>232324</option>
        </select>
      </mt-cell>
      <mt-cell title="考试学期" :value="detailData.kcmc || '--'"></mt-cell>
      <mt-cell title="考试类别" :value="detailData.kkyxmc || '--'"></mt-cell>
      <mt-cell title="考试性质" :value="detailData.kkyxmc || '--'"></mt-cell>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-button @click="popupVisible2 = false" size="large" type="primary">查询</mt-button>
    </mt-popup>
  </div>
</template>

<script>
import request from '@/utils/request'
import { xsList } from '@/api'
import { Indicator, Toast } from 'mint-ui'
// import Detail from '@/components/detail.vue'

export default {
  // components: { Detail },
  name: 'research',
  data() {
    return {
      infoData: '',
      allLoaded: false,
      total: 0,
      currentPage: 1, //当前页面
      payload: { pageSize: 10, pageNum: 1, ksxn: '', ksxq: '', kslb: '', ksxz: '', kcdm: '', kcmc: '' },
      detailData: {},
      popupVisible: false,
      popupVisible2: false
    }
  },
  methods: {
    loadTop() {
      this.getStudentClientInfo('down')
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom() {
      this.allLoaded = false
      this.$refs.loadmore.onBottomLoaded()
      this.getStudentClientInfo('up')
    },
    getStudentClientInfo(type) {
      this.payload.pageNum = this.currentPage
      if (type !== 'down' && this.total > this.payload.pageSize * this.payload.pageNum) {
        this.payload.pageNum++
      }

      if (type === 'down' && this.payload.pageNum > 1) {
        this.payload.pageNum--
      }

      Indicator.open()
      const param = this.payload
      request({
        method: 'post',
        url: xsList,
        data: param,
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
          if (r && r.data && r.data.rows) {
            this.infoData = r.data.rows
            this.total = r.data.total
            this.currentPage = this.payload.pageNum
            Toast({
              message: '第（' + this.currentPage + '）页',
              duration: 1500
            })
            this.allLoaded = ture
          }
        })
        .catch((err) => {})
    },
    goDetail(item) {
      this.detailData = item
      this.popupVisible = true
    }
  },
  mounted() {
    console.log(111, this.$mount)
    this.getStudentClientInfo()
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/styles/base.less');
.achievement {
  .list {
    height: 100%;
    padding: (20 / @base);
    li {
      padding: (15 / @base);
      padding-right: (35 / @base);
      position: relative;
      line-height: (40 / @base);
      min-height: (40 / @base);
      span.key {
        position: absolute;
        display: inline-block;
        width: (50 / @base);
      }
      span.go {
        position: absolute;
        display: inline-block;
        width: (50 / @base);
        top: (15 / @base);
        right: 0;
      }
      .con {
        padding-left: (50 / @base);
      }
    }
    li:nth-child(2n + 1) {
      background: rgb(244, 244, 244);
    }
  }
  .topBtn {
    text-align: right;
    width: 100%;
    overflow: hidden;
    button {
      float: right;
      margin-right: (20 / @base);
      width: (300 / @base);
    }
  }
  .mint-popup2 {
    width: 100%;
    height: auto;
    button {
      width: 50%;
      margin: (30 / @base) auto;
    }
  }
  select {
    border: none;
    background: none;
    font-size: inherit;
    width: 100%;
  }
}
</style>
