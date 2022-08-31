import service from '@/utils/request'

// 用户登录
export function userLogin(data) {
    return service({
        url: '/UserLogin.do',
        method: 'post',
        data
    })
}
// 获取所有用户用户
export function getAllUsers() {
    return service({
        url: '/selectAllUsers.do',
        method: 'get'
    })
}