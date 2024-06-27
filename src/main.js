import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import './static/styles/global.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 视频插件
// import vue3videoPlay from 'vue3-video-play' // 引入组件
// import 'vue3-video-play/dist/style.css' // 引入css
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
// app.use(vue3videoPlay)
app.use(ElementPlus)
app.mount('#app')