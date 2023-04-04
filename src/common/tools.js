
// 菜单，按钮权限查询
export const hasPerm = function (index) {
  let resources = JSON.parse(window.localStorage.getItem("menuInfo")) || ''; //如果'$userInfo'修改，相应的storage.js查询区域里也要相应的修改
  if (resources) {
    console.log(resources);
    const str =resources.replace(/\r|\n/g, "");
    let perm = str.split(",");
    return perm.includes(index);
  } else {
    return false;
  }
};