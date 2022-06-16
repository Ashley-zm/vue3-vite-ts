import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia  from "./store";
//改为element-plus默认UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引用icon
import './assets/icons/iconfont.js'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
const app = createApp(App)

app.component('svg-icon',SvgIcon)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
