<template>
  <div class="research">
    <div class="mainTitle">科研成果信息</div>

    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="list">
        <li v-for="(item, index) in infoData">
          <span>{{ index + 1 }}</span>
          <div class="con">{{ item.lwtm }}</div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import request from '@/utils/request'
import { lwxxList } from '@/api'
import { Indicator, Toast } from 'mint-ui'

export default {
  name: 'research',
  data() {
    return {
      infoData: '',
      allLoaded: false,
      total: 0,
      currentPage: 1, //当前页面
      payload: { pageSize: 30, pageNum: 1 }
    }
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded()
      this.getStudentClientInfo('down')
    },
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded()
      this.getStudentClientInfo()
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
          }
        })
        .catch((err) => {})
    },
    search() {
      alert(1)
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
    padding: (20 / @base);
    li {
      padding: (15 / @base);
      position: relative;
      line-height: (40 / @base);
      span {
        position: absolute;
        display: inline-block;
        width: (50 / @base);
      }
      .con {
        padding-left: (50 / @base);
      }
    }
    li:nth-child(2n + 1) {
      background: rgb(244, 244, 244);
    }
  }
}
</style>
