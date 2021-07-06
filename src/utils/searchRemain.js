/*
 * @Description: 从详情页等返回 保留列表原有的搜索条件
 * @Author: chenjunyi
 * @Date: 2020-06-04 22:55:09
 */

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let pageParams = vm.$store.state.app.pageParams || {}

      //  还原关联的下拉选项
      setTimeout(() => {
        vm.selectMenu = Object.assign({}, vm.selectMenu, pageParams.selectMenu)
      }, 1500);

      if (from.matched[0] && from.matched[0].name === '静态路由' && pageParams.path === vm.$route.path) {
        vm.queryParam = pageParams.params
        vm.parameter = pageParams.pagination
        return vm.initSelectMenu(1)
      }
      vm.initSelectMenu()
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.matched[0].name === '静态路由') {
      this.$store.dispatch('app/setPageParams', {
        path: this.$route.path,
        params: this.queryParam,
        pagination: this.parameter,
        selectMenu: this.selectMenu
      })
    }
    next()
  }
}