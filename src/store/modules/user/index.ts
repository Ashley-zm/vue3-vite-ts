import {defineStore} from 'pinia'
export const userStore=defineStore({
  id:'userStore',
  state:() => ({
    token: sessionStorage.getItem("token"),
    user: JSON.parse(sessionStorage.getItem("user")||'')
  }),
  getters:{},
  actions:{
    SET_TOKENN(token:any){
      this.token = token
      sessionStorage.setItem("token", token)
    },
    SET_USER( user:any) {
        this.user = user
        sessionStorage.setItem("user", JSON.stringify(user))
    },
    REMOVE_INFO(state:any){
        state.token = ''
        state.user = {}
        sessionStorage.setItem("token", '')
        sessionStorage.setItem("user", JSON.stringify(''))
    }
  }
})