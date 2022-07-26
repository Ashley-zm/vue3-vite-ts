<template>
  <el-menu
    router
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    :collapse-transition="false"
    :collapse="state.isCollapse"
    @select="handleSelect"
  >
    <div class="title-banner">
      <img
        v-if="!state.isCollapse"
        src="/images/title.jpg"
        style="width: 85%; margin-top: 8px"
      />
      <img
        v-else-if="state.isCollapse"
        src="/images/logo.jpg"
        style="width: 35px; margin-top: 12px"
      />
    </div>
    <sub-menu v-for="(menu, index) in state.menus" :key="index" :menu="menu"></sub-menu>
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

onMounted(() => {
  getMenus({ roleId: store.user.roleId }).then((res) => {
    if (res.data.flag) {
      const arr = res.data.data;
      const { parentId = "parentId", id = "id" } = {};
      const lookUp: any = {};
      const rootItems: any[] = [];
      arr.forEach((item: { [x: string]: any }) => {
        const idKey = item[id];
        const parentIdKey = item[parentId];
        if (!Object.prototype.hasOwnProperty.call(lookUp, idKey)) {
          lookUp[idKey] = { children: [] };
        }
        lookUp[idKey] = {
          ...item,
          children: lookUp[idKey].children,
          onClick() {
            router.push({ path: item.menuUrl });
          },
        };
        const node = lookUp[idKey];
        if (!parentIdKey) {
          rootItems.push(node);
        } else {
          if (!Object.prototype.hasOwnProperty.call(lookUp, parentIdKey)) {
            lookUp[parentIdKey] = { children: [] };
          }
          lookUp[parentIdKey].children.push(node);
        }
      });
      console.log("转变成tree", rootItems);
      state.menus = rootItems;
    } else {
      // 给store赋值方法-$patch(传参/不传参)
      // store.$patch((state) => {
      //   state.token=''
      //   state.user=''
      // })
      // 给store赋值方法-调用方法action
      store.REMOVE_INFO();
      router.push({ path: "/" });
      ElMessage.error(res.data.msg);
    }
  });
});
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item.is-active {
  background-color: aliceblue;
  border-right: 2px solid;
}
.el-menu {
  height: 100%;

  .title-banner {
    height: 59px;
    border-bottom: 1px solid #dcdfe6;
    h4 {
      margin: 0px;
    }
  }

  .is-collapse {
    position: absolute;
    bottom: 5%;
    text-align: center;
    width: 100%;
    cursor: pointer;
  }

  .is-collapse:hover {
    font-weight: 700;
    color: #007cfb;
  }
}
</style>
