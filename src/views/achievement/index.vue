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
          <div class="con">{{ item.cjlrrbh }} {{ item.kcmc }}</div>
          <span class="go link">&gt;</span>
        </li>
      </ul>
    </mt-loadmore>
    <div v-if="infoData && total === 0" class="noData">
      暂无数据
    </div>
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
      <ul class="g-inputList searchlayer">
        <li>
          <div class="g-inputlist-title">考试学年</div>
          <div class="g-inputlist-content">
            <select v-model="ajax.ksxn">
              <option value="">选择考试学年</option>
              <option :value="item.code" v-for="item in ksxnData">{{ item.name }}</option>
            </select>
          </div>
        </li>
        <li>
          <div class="g-inputlist-title">考试学期</div>
          <div class="g-inputlist-content">
            <select v-model="ajax.ksxq">
              <option value="">选择考试学期</option>
              <option :value="item.code" v-for="item in ksxqData">{{ item.name }}</option>
            </select>
          </div>
        </li>
        <li>
          <div class="g-inputlist-title">考试类别</div>
          <div class="g-inputlist-content">
            <select v-model="ajax.kslb">
              <option value="">选择考试类别</option>
              <option :value="item.code" v-for="item in kslbData">{{ item.name }}</option>
            </select>
          </div>
        </li>
        <li>
          <div class="g-inputlist-title">考试性质</div>
          <div class="g-inputlist-content">
            <select v-model="ajax.ksxz">
              <option value="">选择考试性质</option>
              <option :value="item.code" v-for="item in ksxzData">{{ item.name }}</option>
            </select>
          </div>
        </li>
        <li>
          <div class="g-inputlist-title">课程代码</div>
          <div class="g-inputlist-content">
            <input v-model="ajax.kcdm" placeholder="课程代码" maxlength="20" />
          </div>
        </li>
        <li>
          <div class="g-inputlist-title">课程名称</div>
          <div class="g-inputlist-content">
            <input v-model="ajax.kcmc" placeholder="课程名称" maxlength="20" />
          </div>
        </li>
      </ul>
      <div class="btnBox">
        <mt-button @click="search" size="small" type="primary" style="width:40%">查询</mt-button>
        <mt-button @click="search('reset')" type="danger" size="small">重置</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import request from '@/utils/request'
import { xsList, TYPE0109, TYPE0125, TYPE0358, TYPE0072 } from '@/api'
import { Indicator, Toast } from 'mint-ui'

export default {
  name: 'research',
  data() {
    return {
      infoData: '',
      allLoaded: false,
      total: 0,
      currentPage: 1, //当前页面
      ajax: { pageSize: 10, pageNum: 1, ksxn: '', ksxq: '', kslb: '', ksxz: '', kcdm: '', kcmc: '' },
      detailData: {},
      popupVisible: false,
      popupVisible2: false,
      ksxnData: [],
      ksxqData: [],
      kslbData: [],
      ksxzData: []
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
      this.ajax.pageNum = this.currentPage
      if (type === 'up' && this.total > this.ajax.pageSize * this.ajax.pageNum) {
        this.ajax.pageNum++
      }

      if (type === 'down' && this.ajax.pageNum > 1) {
        this.ajax.pageNum--
      }

      Indicator.open()
      const param = this.ajax
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
            this.currentPage = this.ajax.pageNum
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
    },
    getTYPE0125() {
      request
        .get(TYPE0125, {})
        .then((res) => {
          const r = res.data
          if (r && r.data) {
            this.ksxnData = r.data
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
            this.ksxqData = r.data
          }
        })
        .catch((err) => {})
    },
    getTYPE0109() {
      request
        .get(TYPE0109, {})
        .then((res) => {
          const r = res.data
          if (r && r.data) {
            this.kslbData = r.data
          }
        })
        .catch((err) => {})
    },
    getTYPE0358() {
      request
        .get(TYPE0358, {})
        .then((res) => {
          const r = res.data
          if (r && r.data) {
            this.ksxzData = r.data
          }
        })
        .catch((err) => {})
    },
    search(type) {
      this.popupVisible2 = false
      this.pageNum = 1
      if (type === 'reset') {
        this.ajax = { ...this.ajax, pageNum: 1, ksxn: '', ksxq: '', kslb: '', ksxz: '', kcdm: '', kcmc: '' }
      }
      this.getStudentClientInfo(type)
    }
  },
  mounted() {
    this.getTYPE0125()
    this.getTYPE0072()
    this.getTYPE0109()
    this.getTYPE0358()
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
    .btnBox {
      text-align: center;
    }
    button {
      width: 20%;
      margin: (30 / @base) auto;
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
