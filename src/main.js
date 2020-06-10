import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import axios from 'axios'
import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import { postRequest } from './utils/api'
import { putRequest } from './utils/api'
import { deleteRequest } from './utils/api'
import { getRequest } from './utils/api'
import 'font-awesome/css/font-awesome.min.css'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

Vue.use(VueDirectiveImagePreviewer)

// 制作插件 ，调用方法的时候就不用导入了，this.方法就能使用
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.getRequest = getRequest

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size

})
Vue.prototype.$axios = axios
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
