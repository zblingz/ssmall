import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

import VueLazy from 'vue3-lazy'

import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).use(toast).use(VueLazy, {
  loading: require('assets/img/lazy/wwyx.jpg'), //图片加载时默认图片
  error: require('assets/img/lazy/yw.jpg')    //图片加载失败时默认图片
}).mount('#app')
