// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import i18n from '@/lang'
import Antd from 'ant-design-vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'

import 'ant-design-vue/dist/antd.css'
// qrcode
import VueQrcode from '@xkeshi/vue-qrcode'
import store from '@/store'
import './permission'
Vue.component(VueQrcode.name, VueQrcode)
Vue.use(Antd)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
