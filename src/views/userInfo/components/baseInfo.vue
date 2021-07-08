<template>
  <div class="baseInfo">
    <div v-if="studentData">
      <div class="infoBox">
        <table class="table">
          <tr>
            <th>学号</th>
            <td>{{ studentData.xh }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ studentData.xm }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ studentData.xbmc }}</td>
          </tr>
          <tr>
            <th>院系</th>
            <td>{{ studentData.xjxx && studentData.xjxx.ssyxmc }}</td>
          </tr>
          <tr>
            <th>专业</th>
            <td>{{ studentData.xjxx && studentData.xjxx.sszymc }}</td>
          </tr>
          <tr>
            <th>学科专业码</th>
            <td>{{ studentData.xjxx && studentData.xjxx.sszym }}</td>
          </tr>
          <tr>
            <th>证件类型</th>
            <td>{{ studentData.sfzjlxmc }}</td>
          </tr>
          <tr>
            <th>身份证号</th>
            <td>{{ studentData.zjhm }}</td>
          </tr>
          <tr>
            <th>出生日期</th>
            <td>{{ studentData.csrq && this.$moment(studentData.csrq).format('YYYY-MM-DD') }}</td>
          </tr>
        </table>
      </div>
      <div class="line"></div>
      <div class="infoBox">
        <table class="table">
          <tr>
            <th>姓名拼音</th>
            <td>{{ studentData.xmpy }}</td>
          </tr>
          <tr>
            <th>英文名</th>
            <td>{{ studentData.ywxm }}</td>
          </tr>
          <tr>
            <th>婚姻状况</th>
            <td>{{ studentData.hyzkmc }}</td>
          </tr>
          <tr>
            <th>个人电话</th>
            <td>{{ studentData.lxdh }}</td>
          </tr>
          <tr>
            <th>宿舍电话</th>
            <td>{{ studentData.ssdh }}</td>
          </tr>
          <tr>
            <th>QQ号码</th>
            <td>{{ studentData.qqhm || '--' }}</td>
          </tr>
          <tr>
            <th>实验室电话</th>
            <td>{{ studentData.sysdh || '--' }}</td>
          </tr>
          <tr>
            <th>家庭电话</th>
            <td>{{ studentData.jtdh || '--' }}</td>
          </tr>
          <tr>
            <th>民族</th>
            <td>{{ studentData.mzmc }}</td>
          </tr>
          <tr>
            <th>政治面貌</th>
            <td>{{ studentData.zzmmmc || '--' }}</td>
          </tr>
          <tr>
            <th>宿舍地址</th>
            <td>{{ studentData.ssdz || '--' }}</td>
          </tr>
          <tr>
            <th>健康状况</th>
            <td>{{ studentData.jkzkmc || '--' }}</td>
          </tr>
          <tr>
            <th>家庭地址</th>
            <td>{{ studentData.jtzz || '--' }}</td>
          </tr>

          <tr>
            <th>通讯地址</th>
            <td>{{ studentData.txdz || '--' }}</td>
          </tr>
          <tr>
            <th>所在教研室</th>
            <td>{{ studentData.szjyshyjjg || '--' }}</td>
          </tr>
          <tr>
            <th>家庭地址邮编</th>
            <td>{{ studentData.jyyzbm || '--' }}</td>
          </tr>
          <tr>
            <th>籍贯</th>
            <td>{{ studentData.jgsdmc }}&nbsp;{{ studentData.jgcdmc }}&nbsp;{{ studentData.jgxqdmc }}</td>
          </tr>
          <tr>
            <th>出生地</th>
            <td>{{ studentData.csdsdmc }}&nbsp;{{ studentData.csdcdmc }}&nbsp;{{ studentData.csdxqdmc }}</td>
          </tr>
          <tr>
            <th>电子邮箱</th>
            <td>{{ studentData.dzxx || '--' }}</td>
          </tr>
          <tr>
            <th>借书证号</th>
            <td>{{ studentData.xjxx || '--' }}</td>
          </tr>
          <tr>
            <th>血型</th>
            <td>{{ studentData.xxmc || '--' }}</td>
          </tr>
        </table>
      </div>
      <div class="line"></div>
      <div class="infoBox">
        <table class="table">
          <tr>
            <th>考生编号</th>
            <td>{{ studentData.xjxx && studentData.xjxx.ksbh }}</td>
          </tr>
          <tr>
            <th>会何种外语</th>
            <td>{{ studentData.hhzwy || '--' }}</td>
          </tr>
          <tr>
            <th>外语熟练程度</th>
            <td>{{ studentData.wyslcdmc || '--' }}</td>
          </tr>
          <tr>
            <th>入学前最后学历</th>
            <td>{{ studentData.rxqzhxlmc || '--' }}</td>
          </tr>
          <tr>
            <th>大学毕业年月</th>
            <td>
              {{
                studentData.xjxx && studentData.xjxx.xslbm && studentData.xjxx.xslbm === '431'
                  ? studentData.dxbyny && this.$moment(studentData.dxbyny).format('YYYY-MM-DD')
                  : studentData.ssbyny && this.$moment(studentData.ssbyny).format('YYYY-MM-DD')
              }}
            </td>
          </tr>
          <tr>
            <th>最后毕业学校名称</th>
            <td>
              {{
                studentData.xjxx && studentData.xjxx.xslbm && studentData.xjxx.xslbm === '431'
                  ? studentData.dxbyxxmc
                  : studentData.ssbyxxmc
              }}
            </td>
          </tr>
          <tr>
            <th>入学前最后学位</th>
            <td>{{ studentData.rxqzhxwmc || '--' }}</td>
          </tr>
          <tr>
            <th>最高学位学科门类</th>
            <td>
              {{
                studentData.xjxx && studentData.xjxx.xslbm && studentData.xjxx.xslbm === '431'
                  ? studentData.xsxwxkmldmc
                  : studentData.ssxwxkmlmc
              }}
            </td>
          </tr>
          <tr>
            <th>最高学历专业</th>
            <td>
              {{
                studentData.xjxx && studentData.xjxx.xslbm && studentData.xjxx.xslbm === '431'
                  ? studentData.dxbyxy
                  : studentData.ssbyzy
              }}
            </td>
          </tr>
          <tr>
            <th>最高学历单位</th>
            <td>
              {{
                studentData.xjxx && studentData.xjxx.xslbm && studentData.xjxx.xslbm === '431'
                  ? studentData.sxsxwdwmc
                  : studentData.sssxwdwmc
              }}
            </td>
          </tr>
          <tr>
            <th>何时参加工作</th>
            <td>
              {{ studentData.hscjgz && this.$moment(studentData.hscjgz).format('YYYY-MM-DD') }}
            </td>
          </tr>
          <tr>
            <th>何地参加工作</th>
            <td>{{ studentData.hdcjgz || '--' }}</td>
          </tr>
          <tr>
            <th>原工资级别</th>
            <td>{{ studentData.ygzjb || '--' }}</td>
          </tr>
          <tr>
            <th>何时入党或入团</th>
            <td>{{ studentData.hsrdht && this.$moment(studentData.hsrdht).format('YYYY-MM-DD') }}</td>
          </tr>
          <tr>
            <th>原工资级别</th>
            <td>{{ studentData.hdrdht || '--' }}</td>
          </tr>
          <tr>
            <th>配偶姓名</th>
            <td>{{ studentData.poxm || '--' }}</td>
          </tr>
          <tr>
            <th>配偶政治面貌</th>
            <td>{{ studentData.pozzmmmc || '--' }}</td>
          </tr>
          <tr>
            <th>配偶工作单位</th>
            <td>{{ studentData.pogzdw || '--' }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { studentClientInfo } from '@/api'
import { Indicator } from 'mint-ui'

export default {
  name: 'baseInfo',
  data() {
    return {
      studentData: ''
    }
  },
  methods: {
    getStudentClientInfo() {
      Indicator.open()
      request
        .get(studentClientInfo, {})
        .then((res) => {
          Indicator.close()
          const r = res.data
          if (r && r.data) {
            this.studentData = r.data
          }
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
.baseInfo {
  padding-top: (80 / @base);
  .infoBox {
    padding: (20 / @base);
  }
  table {
    width: 100%;
    th,
    td {
      font-size: (26 / @base);
      padding: (18 / @base) (12 / @base);
      font-weight: normal;
    }
    th {
      vertical-align: top;
      text-align: left;
      width: (100 / @base);
      white-space: nowrap;
    }
    td {
      text-align: right;
      word-wrap: break-word;
      word-break: break-all;
      color: #888;
    }
  }

  tr:nth-child(2n + 1) {
    background: rgb(244, 244, 244);
  }
}
</style>
