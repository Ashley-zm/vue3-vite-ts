<template>
  <el-menu
    router
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    text-color="#fff"
    active-text-color="#fff"
    background-color="#001428"
    :collapse-transition="false"
    :collapse="state.isCollapse"
    @select="handleSelect"
  >
    <div class="title-banner">
      <div v-if="!state.isCollapse">
        <img style="width: 30px; margin-top: 12px" src="/images/logo-removebg.png" />
        <p>后台管理系统</p>
      </div>
      <img
        v-else-if="state.isCollapse"
        src="/images/logo-removebg.png"
        style="width: 35px; margin-top: 12px"
      />
    </div>
    <SubMenu
      v-for="(menu, index) in state.menusCeShi"
      :key="index"
      :menu="menu"
    ></SubMenu>
    <div @click="handleChange" class="is-collapse">
      <el-icon v-show="state.isCollapse">
        <Expand />
      </el-icon>
      <el-icon v-show="!state.isCollapse">
        <Fold />
      </el-icon>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
// 菜单组件
import SubMenu from "@/components/menu/SubMenu.vue";
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
// 获取菜单接口
import { getMenus } from "@/api/user";
//pinia 数据
import { userStore } from "@/store";
// 用来解构赋值
import { storeToRefs } from "pinia";

const store = userStore();
// 直接解构赋值后，数据不会进行响应式数据
// const { user } = store; //此处的user是个死数据
// const { user } = storeToRefs(store); //此处的user是响应式数据

// 默认激活菜单
const emit = defineEmits(["getChange"]);
// 传递的菜单数据
const props = defineProps({
  menu: {
    type: Array,
    default: [],
  },
});
const router = useRouter();
const route = useRoute();
const state = reactive({
  isCollapse: false,
  menus: [] as any,
  menusCeShi: [
    {
      MenuId: 5,
      MenuName: "用户管理",
      ParentId: null,
      icon: "iconyonghutouxiang",
      IsMenu: "1",
      code: "/TheUser",
      RMId: 5,
      RoleId: 2,
      children: [],
    },
    {
      MenuId: 6,
      MenuName: "一张图",
      icon: "iconditu1",
      ParentId: null,
      IsMenu: "1",
      code: "/TheMap",
      RMId: 6,
      RoleId: 2,
      children: [],
    },
  ],
});
// 菜单开关
const handleChange = () => {
  state.isCollapse = !state.isCollapse;
  emit("getChange", state.isCollapse);
};
// 菜单选择
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, route.path, keyPath);
};

// onMounted(() => {
//   const arr = store.menuInfo;
//   console.log("菜单数据1", store);
//   console.log("菜单数据1", store.GET_MENU());
//   console.log("菜单数据2", sessionStorage.getItem("menuInfo"));

//   const { ParentId = "ParentId", MenuId = "MenuId" } = {};
//   const lookUp: any = {};
//   const rootItems: any[] = [];
//   arr.forEach((item: { [x: string]: any }) => {
//     const idKey = item[MenuId];
//     const parentIdKey = item[ParentId];
//     if (!Object.prototype.hasOwnProperty.call(lookUp, idKey)) {
//       lookUp[idKey] = { children: [] };
//     }
//     lookUp[idKey] = {
//       ...item,
//       children: lookUp[idKey].children,
//       onClick() {
//         router.push({ path: item.menuUrl });
//       },
//     };
//     const node = lookUp[idKey];
//     if (!parentIdKey) {
//       rootItems.push(node);
//     } else {
//       if (!Object.prototype.hasOwnProperty.call(lookUp, parentIdKey)) {
//         lookUp[parentIdKey] = { children: [] };
//       }
//       lookUp[parentIdKey].children.push(node);
//     }
//   });
//   console.log("转变成tree", rootItems);
//   state.menus = rootItems;
// });
// onMounted(() => {
//   getMenus({ roleId: store.user.roleId }).then((res) => {
//     if (res.data.flag) {
//       const arr = res.data.data;
//       const { parentId = "parentId", id = "id" } = {};
//       const lookUp: any = {};
//       const rootItems: any[] = [];
//       arr.forEach((item: { [x: string]: any }) => {
//         const idKey = item[id];
//         const parentIdKey = item[parentId];
//         if (!Object.prototype.hasOwnProperty.call(lookUp, idKey)) {
//           lookUp[idKey] = { children: [] };
//         }
//         lookUp[idKey] = {
//           ...item,
//           children: lookUp[idKey].children,
//           onClick() {
//             router.push({ path: item.menuUrl });
//           },
//         };
//         const node = lookUp[idKey];
//         if (!parentIdKey) {
//           rootItems.push(node);
//         } else {
//           if (!Object.prototype.hasOwnProperty.call(lookUp, parentIdKey)) {
//             lookUp[parentIdKey] = { children: [] };
//           }
//           lookUp[parentIdKey].children.push(node);
//         }
//       });
//       console.log("转变成tree", rootItems);
//       state.menus = rootItems;
//     } else {
//       // 给store赋值方法-$patch(传参/不传参)
//       // store.$patch((state) => {
//       //   state.token=''
//       //   state.user=''
//       // })
//       // 给store赋值方法-调用方法action
//       store.REMOVE_INFO();
//       router.push({ path: "/" });
//       ElMessage.error(res.data.msg);
//     }
//   });
// });
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-item.is-active {
  background-color: #2d8cf0;
  // background-color: aliceblue;
  // border-right: 2px solid;
}

.el-menu {
  height: 100%;

  .title-banner {
    height: 59px;
    // border-bottom: 1px solid #dcdfe6;

    h4 {
      margin: 0px;
    }
    div{
      display: flex;
      align-items: flex-start;
      justify-content: center;
      p{
        color: #ffffff;
        margin-left: 10px;
      }
    }
  }

  .is-collapse {
    position: absolute;
    bottom: 5%;
    text-align: center;
    width: 100%;
    cursor: pointer;
  }

  .is-collapse {
    font-weight: 700;
    color: #ffffff;
    // color: #007cfb;
  }
}
</style>
