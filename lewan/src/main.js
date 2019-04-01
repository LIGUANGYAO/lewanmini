import Vue from 'vue'
import App from './App'
import http from '@/utils/http';//导入封装好的http
import apis from '@/utils/api';//导入封装好的apis
import tool from '@/utils/tool';//导入封装好的各种工具

Vue.prototype.$http=http;//微信小程序网络请求的配置
Vue.prototype.$apis=apis;//微信小程序请求地址的集合
Vue.prototype.$global =tool;//微信小程序工具集合

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
