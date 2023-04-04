import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
// 定义容器
export const userStore = defineStore({
  id: 'userStore',
  // 创建state
  state: () => ({
    token : Cookies.get('token') ? Cookies.get('token') : '',
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '') : '',
    roleInfo: localStorage.getItem("roleInfo") ? JSON.parse(localStorage.getItem("roleInfo") || '') : '',
    menuInfo: localStorage.getItem("menuInfo") ? JSON.parse(localStorage.getItem("menuInfo") || ''): [],
    // user: ''
  }),
  // 计算
  getters: {},
  // 方法
  actions: {
    SET_TOKENN(token: string) {
      this.token = token;
      Cookies.set('token', token);
    },
    SET_USER(user: string, roleInfo: string, menuInfo: string) {
      this.user = user
      this.roleInfo = roleInfo
      this.menuInfo = menuInfo
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("roleInfo", JSON.stringify(roleInfo))
      localStorage.setItem("menuInfo", JSON.stringify(menuInfo))
    },
    GET_MENU(){
      return this.menuInfo;
    },
    SET_AVATARURL(avatarUrl: string) {
      const serverUrl = import.meta.env.VITE_URL;
      this.user.avatarUrl = serverUrl + avatarUrl
    },
    REMOVE_SESSION() {
      this.user = '';
      this.roleInfo = '';
      this.menuInfo = '';
      localStorage.clear();
    },
    REMOVE_INFO() {
      this.token = '';
      this.user = '';
      this.roleInfo = '';
      this.menuInfo = '';
      Cookies.remove('token')
      localStorage.clear();
    },
  }
})