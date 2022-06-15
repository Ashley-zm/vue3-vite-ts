import {defineStore} from 'pinia'
export const userStore=defineStore({
  id:'userStore',
  state:() => ({
    userName:'pinia',
    password:'pinia'
  }),
  getters:{},
  actions:{}
})