<template>
  <div class="research">
    <div class="mainTitle">科研成果信息</div>
    <div class="topBtn"><mt-button @click="popupVisible2 = true" size="normal" type="primary">条件查询</mt-button></div>

    <mt-loadmore
      v-if="infoData && total > 0"
      :auto-fill="false"
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <ul class="list">
        <li v-for="(item, index) in infoData" @click="goDetail(item)">
          <span class="key">{{ index + 1 }}</span>
          <div class="con">{{ item.lwtm }}</div>
          <span class="go link">&gt;</span>
        </li>
      </ul>
    </mt-loadmore>

    <div v-if="infoData && total == 0" class="noData">
      暂无数据
    </div>

    <!-- <Detail :detailData="detailData" :popupVisible="popupVisible" /> -->
    <mt-popup position="right" class="mint-popup" v-model="popupVisible">
      <div class="popupCon">
        <mt-button @click="popupVisible = false" size="large" type="primary">关闭</mt-button>
        <mt-cell title="论文题目" :value="detailData.lwtm || '--'"></mt-cell>
        <mt-cell title="论文主题词" :value="detailData.lwztc || '--'"></mt-cell>
        <mt-cell title="刊物名称" :value="detailData.kwmc || '--'"></mt-cell>
        <mt-cell title="影响因子" :value="detailData.yxyz || '--'"></mt-cell>
        <mt-cell title="发表时间" :value="detailData.lwfbsj || '--'"></mt-cell>
        <mt-cell title="导师审核状态" :value="detailData.dsshztmc || '--'"></mt-cell>
        <mt-cell title="院系审核结果" :value="detailData.shztmc || '--'"></mt-cell>
      </div>
    </mt-popup>

    <mt-popup v-model="popupVisible2" position="top" class="mint-popup2">
      <ul class="g-inputList searchlayer">
        <li>
          <div class="g-inputlist-title">论文题目</div>
          <div class="g-inputlist-content">
            <input v-model="payload.lwtm" placeholder="论文题目" maxlength="100" />
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
import { lwxxList } from '@/api'
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
      payload: { pageSize: 30, pageNum: 1, lwtm: '' },
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
      if (type === 'up' && this.total > this.payload.pageSize * this.payload.pageNum) {
        this.payload.pageNum++
      }

      if (type === 'down' && this.payload.pageNum > 1) {
        this.payload.pageNum--
      }

      Indicator.open()
      const param = this.payload
      request({
        method: 'post',
        url: lwxxList,
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
    },
    search(type) {
      this.popupVisible2 = false
      this.pageNum = 1
      if (type === 'reset') {
        this.payload = { ...this.payload, pageNum: 1, lwtm: '' }
      }
      this.getStudentClientInfo(type)
    }
  },
  mounted() {
    this.getStudentClientInfo()
  }
}
</script>

<style scoped lang="less">
@import url('../../assets/styles/base.less');
.research {
  .list {
    height: 100%;
    padding: (20 / @base);
    li {
      padding: (15 / @base);
      padding-right: (35 / @base);

      position: relative;
      line-height: (40 / @base);
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
  .searchlayer {
    padding: (30 / @base) (15 / @base);
  }
}
</style>
