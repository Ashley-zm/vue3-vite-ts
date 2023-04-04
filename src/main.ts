import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from "./store";
import { userStore } from "@/store";
//改为element-plus默认UI
import ElementPlus from 'element-plus';
import { ElMessage } from "element-plus";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引用icon
import './assets/icons/iconfont.js'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import Cookies from 'js-cookie'
// 验证接口
import { validateToken } from "@/api/user";
const app = createApp(App)

//注册svg
app.component('svg-icon', SvgIcon)
app.use(router)
app.use(ElementPlus)
app.use(pinia)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const store = userStore()

// 是否登录
if (Cookies.get("token")) {
//  token是否有效
  validateToken().then((res) => {
// localStorage 是否存在
    if (!localStorage.getItem('user')) {      
        router.push({
          path: "/",
        });
        store.REMOVE_INFO();
      }else{
      router.push({
        path: "/home",
      });
    }
  }).catch((err) => {
    // token失效，清除并重新登录
    store.REMOVE_INFO();
    ElMessage.error("登录超时-请重新登录！");
    router.push({ path: '/' })
  })
} else {
  // 没有登录，进行登录
  router.push({ path: '/' })
}
app.mount('#app')
