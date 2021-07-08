<template>
  <div class="userInfo">
    <mt-navbar v-model="selected" :fixed="true">
      <mt-tab-item id="1">个人信息</mt-tab-item>
      <mt-tab-item id="2">个人简历</mt-tab-item>
      <mt-tab-item id="3">社会关系</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <Baseinfo />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <Resume />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <Social />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Baseinfo from './components/baseInfo'
import Resume from './components/resume'
import Social from './components/social'
export default {
  name: 'userInfo',
  components: { Baseinfo, Resume, Social },
  data() {
    return {
      selected: '1',
      currentView: 'Baseinfo'
    }
  },
  methods: {
    changeViewFun(val) {
      this.currentView = val
    }
  },
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
//@import url('../../assets/styles/base.less');
</style>
