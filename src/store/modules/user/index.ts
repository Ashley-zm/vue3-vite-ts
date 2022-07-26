import {defineStore} from 'pinia'
// 定义容器
export const userStore=defineStore({
  id:'userStore',
  // 创建state
  state:() => ({
    // token: '',
    token: sessionStorage.getItem("token")?sessionStorage.getItem("token"):'',
    user: sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")||''):'',
    // user: ''
  }),
  // 计算
  getters:{},
  // 方法
  actions:{
    SET_TOKENN(token:any){
      this.token = token
      sessionStorage.setItem("token", token)
    },
    SET_USER( user:any) {
        this.user = user
        sessionStorage.setItem("user", JSON.stringify(user))
    },
    REMOVE_INFO(){
    // REMOVE_INFO(state:any){
        // state.token = ''
        // state.user = {}
        this.token=''
        this.user=''
        sessionStorage.setItem("token", '')
        sessionStorage.setItem("user", JSON.stringify(''))
    },
  }
})