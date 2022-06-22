import axios from 'axios'
import pinia  from "@/store";
import { userStore } from "@/store/modules/user";
//创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_RES_URL, // api的base_url
})
const store=userStore(pinia)//添加参数pinia,不然报错：pinia实例还没挂载
// request 请求拦截
service.interceptors.request.use(
    config => {
        if (store.token) {
            config.headers['token'] = window.sessionStorage.getItem("token")
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)
//response响应拦截
axios.interceptors.response.use(response => {
    let res = response.data;
    console.log(res)
    if (res.code === 200) {
        return response
    } else {
        return Promise.reject(response.data.msg)
    }
},
    error => {
        console.log(error)
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        if (error.response.status === 401) {
            router.push("/")
        }
        return Promise.reject(error)
    }
)


export default service
