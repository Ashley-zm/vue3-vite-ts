import service from '@/utils/request'

// 验证token是否有效
export function validateToken(data) {
    return service({
        url: '/auth/validateToken.do',
        method: 'get',
        data
    })
}
// 用户登录
export function userLogin(data) {
    return service({
        url: '/auth/login.do',
        // url: '/user/userLogin.do',
        method: 'post',
        data
    })
}
// 根据角色id查询该角色下的菜单权限
export function getMenus(data) {
    return service({
        url: '/user/getMenus.do',
        method: 'post',
        data
    })
}
// 获取所有用户用户
export function getAllUsers(data) {
    return service({
        url: '/user/findAllUser.do',
        method: 'post',
        // url: '/user/selectAllUsers.do',
        // method: 'post',
        data
    })
}
// 获取所有角色
export function getAllRoles() {
    return service({
        url: '/role/getAllRoles.do',
        method: 'get'
    })
}
// 获取用户详情信息
export function getUserDetail(data) {
    return service({
        url: '/user/getUserDetail.do',
        method: 'post',
        data
    })
}
// 获取所有组织
export function getAllGroups() {
    return service({
        url: '/user/getAllGroups.do',
        method: 'get'
    })
}
// 获取所有组织
export function getRoles(data) {
    return service({
        url: '/user/getRoles.do',
        method: 'post',
        data
    })
}
// 上传头像
export function uploadAvatar(data) {
    return service({
        url: '/user/uploadAvatar.do',
        method: 'post',
        data
    })
}