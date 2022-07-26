import axios from 'axios'
import pinia  from "@/store";
import { userStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";

// 登录地址
const redirectUrl=`http://${window.location.host}/`

//创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_RES_URL, // api的base_url：http://localhost:5001/vite
})
const store=userStore(pinia)//添加参数pinia,不然报错：pinia实例还没挂载
// request 请求拦截
service.interceptors.request.use(
    config => {
        if (store.token) {
            console.log("添加请求头token");
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
service.interceptors.response.use(response => {
    let res = response.data;
    if (res.code === 200) {
        return response
    } else {
        if(res.code === 400){
            store.REMOVE_INFO();
            window.location.href=redirectUrl
            ElMessage.error(res.msg);
        }
        return Promise.reject(response.data.msg)
    }
},
    error => {
        console.log(error)
        if (error.response.data) {
            error.message = error.response.data.msg
        }
        if (error.response.status === 401||error.response.status === 400) {
            store.REMOVE_INFO()
        }
        return Promise.reject(error)
    }
)


export default service
