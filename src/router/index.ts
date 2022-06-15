import { createRouter, createWebHashHistory } from "vue-router";

// 定义路由组件.
import User from '@/view/user/UserLogin.vue'
import TheHome from '@/view/user/TheHome.vue'

// 定义路由
const routes = [
  {
    path: "/",
    name:'login',
    // redirect: '/login',
    component:User,
    // component: () => import("@/view/user/UserLogin.vue"),
  },
   {
    path: "/home",
    name:'home',
    component:TheHome,
  },
];

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
