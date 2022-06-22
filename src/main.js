import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia  from "./store";
import { userStore } from "@/store";
//改为element-plus默认UI
import ElementPlus from 'element-plus'
import { ElMessage } from "element-plus";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引用icon
import './assets/icons/iconfont.js'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
//引用axios
// import axios from 'axios';
const app = createApp(App)
//全局注册 axios

//注册svg
app.component('svg-icon',SvgIcon)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//钩子函数，访问路由前调用
// 判断用户是否登录，通过获取store中是否存有token信息，若有则直接进入，若没有则跳转到登录页面。
const store=userStore()
router.beforeEach((to, from, next) => {
  console.log("认证",store.token);
  //路由需要认证
  if (to.meta.requireAuth) {
    //判断pinia里是否有token
    if (store.token) {
      next()
    } else {
      next({
        path: '/',
      })
      ElMessage.error("登录超时-请重新登录！");
    }
  } else {
    next()
  }
}
)
app.mount('#app')
