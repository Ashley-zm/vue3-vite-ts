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
    SET_AVATARURL(avatarUrl:string){
      const serverUrl = import.meta.env.VITE_URL;
      console.log("修改了1",avatarUrl);
      console.log("修改了2",this.user.avatarUrl);
      this.user.avatarUrl=serverUrl+avatarUrl
      console.log("修改了2.1",this.user.avatarUrl);
    },
    REMOVE_INFO(){
        // state.token = ''
        // state.user = {}
        this.token=''
        this.user=''
        sessionStorage.setItem("token", '')
        sessionStorage.setItem("user", JSON.stringify(''))
    },
  }
})