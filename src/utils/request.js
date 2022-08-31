import axios from 'axios'
import pinia  from "@/store";
import { userStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import SM from '@/utils/sm-crypto.js'

// 登录地址
const redirectUrl=`http://${window.location.host}/`

//创建axios实例
const service = axios.create({
    // 开发环境 api的base_url
    baseURL: import.meta.env.VITE_MODE_NAME==='development'?import.meta.env.VITE_RES_URL:'', 
})

const store=userStore(pinia)//添加参数pinia,不然报错：pinia实例还没挂载
// request 请求拦截
service.interceptors.request.use(
    config => {
        if (store.token) {
            console.log("添加请求头token",config.url);
            config.headers['token'] = window.sessionStorage.getItem("token")
        }
        config.data={
            encrypt:SM.getSm2DataHexByObject(config.data)
        }
        console.log("加密-request 请求拦截", config.data);
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
        console.log("解密-response响应拦截",response.data);
        response.data.data=SM.getSm2DataByString(response.data.data)

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
