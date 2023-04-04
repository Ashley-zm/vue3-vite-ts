import axios from 'axios'
import pinia  from "@/store";
import { userStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import Cookies from 'js-cookie'
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
        config.headers['Authorization'] = 'Bearer '+Cookies.get("token")
        if (store.token) {
            // config.headers['Authorization'] = store.token
            // console.log("添加请求头token",config);
        }
        // 测试nest 先注释
        // config.data={
        //     encrypt:SM.getSm2DataHexByObject(config.data)
        // }
        // console.log("加密-request 请求拦截", config.data);
        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)
//response响应拦截
service.interceptors.response.use(response => {
    let res = response.data;
    // console.log(res);
    if (res.code === 200) {
        // console.log("解密-response响应拦截",response.data);
        // response.data.data=SM.getSm2DataByString(response.data.data)

        return response
    } else {
        if(res.code === 400){
            // store.REMOVE_INFO();
            window.location.href=redirectUrl
            ElMessage.error(res.msg);
        }
        return Promise.reject(response.data.msg)
    }
},
    error => {
        if (error.response.data) {
            error.msg = error.response.data.msg
            if (error.msg==='请重新登录'||error.msg==="Unauthorized") {
                store.REMOVE_INFO();
                window.location.href=redirectUrl
                ElMessage.error('登录超时-请重新登录！');
            }
        }
        // if (error.response.status === 401||error.response.status === 400) {
        //     // store.REMOVE_INFO();
        //     // window.location.href=redirectUrl
        //     // ElMessage.error(res.msg);
        // }
        return Promise.reject(error)
    }
)


export default service
