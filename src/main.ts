import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
//less文件
import '@/styles/index.less'
//ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'; // 引入官方提供的 less 样式入口文件

import i18n from './i18n'
//vxe-table
import 'xe-utils'
import VXETable from 'vxe-table'
VXETable.setup({
  // 对组件内置的提示语进行国际化翻译
  i18n: (key, args) => i18n.global.t(key, args)
})
import bzComponents from "./config/bzComponents"

import 'vxe-table/lib/style.css'
import Directives from '@/utils/directives';
const app = createApp(App)

//时间格式
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
app.config.globalProperties.$moment = moment
import cytoscape from 'cytoscape';
app.config.globalProperties.$cytoscape = cytoscape;
//引入echarts
import * as echarts from 'echarts'
app.config.globalProperties.$echarts = echarts

import VNetworkGraph from 'v-network-graph'
import 'v-network-graph/lib/style.css'
// app.provide<any>('echarts',echarts)
app.use(store)
app.use(router)
app.use(Antd)
app.use(VXETable)
app.use(i18n);
app.use(Directives)
app.use(bzComponents)
app.use(VNetworkGraph)
app.mount('#app')
