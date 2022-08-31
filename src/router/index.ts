import { createRouter, createWebHashHistory } from "vue-router";

// 定义路由组件.
import UserLogin from '@/view/home/UserLogin.vue'
import TheHome from '@/view/home/TheHome.vue'
import TheMap from '@/view/map/TheMap.vue'
import TheNewQuestions from '@/view/questionnaire/TheNewQuestions.vue'
import TheQuestions from '@/view/questionnaire/TheQuestions.vue'
import TheUser from '@/view/user/TheUser.vue'

// 定义路由
const routes = [
  {
    path: "/",
    name:'login',
    component:UserLogin,
  },
   {
    path: "/home",
    component:TheHome,
    redirect:'/TheMap',
    children:[
      {
        path: "/TheMap",
        name:'一张图',
        component:TheMap,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/TheQuestions",
        name:'问卷管理',
        component:TheQuestions,
      },
      {
        path: "/TheNewQuestions",
        name:'创建调查问卷',
        component:TheNewQuestions,
      },
      {
        path: "/TheUser",
        name:'用户信息',
        component:TheUser,
      },
    ]
  },
  
];

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
