// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import './assets/styles/main.less'
import Local from './utils/localstorage'
import moment from 'moment'

import { Button, Cell, Field, Radio, Navbar, TabItem, TabContainer, TabContainerItem, Loadmore } from 'mint-ui'

Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Radio.name, Radio)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Loadmore.name, Loadmore)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 绑定全局方法
Vue.prototype.$Local = Local
Vue.prototype.$moment = moment //赋值使用

// 适配移动端
;(function(doc, win) {
  var resizeEvt
  var recalc = function() {
    var docEl = document.getElementsByTagName('html')[0]
    var bodyEl = document.getElementsByTagName('body')[0]
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var maxWidth = 750
    var clientWidth = docEl.clientWidth > maxWidth ? maxWidth : docEl.clientWidth
    if (!clientWidth) {
      return
    }
    docEl.style.fontSize = clientWidth / 10 + 'px'
    bodyEl.style.maxWidth = clientWidth + 'px'
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
