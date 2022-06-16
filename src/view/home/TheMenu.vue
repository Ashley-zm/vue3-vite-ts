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
import SubMenu from "@/components/menu/SubMenu.vue";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
// 默认激活菜单
const emit = defineEmits(["getChange"]);
const router = useRouter();
const route = useRoute();
const state = reactive({
  isCollapse: false,
  menus: [
    {
      path: "/TheMap",
      name: "一张图",
      icon: "iconquyu",
      onClick() {
        router.push({ path: "/TheMap" });
      },
    },
    {
      path: "/TheMonitoring",
      name: "实时监测",
      icon: "icondangan",
      children: [
        {
          path: "/TheMonitoring/TheData",
          name: "实时数据",
          onClick() {
            router.push({ path: "/TheData" });
          },
        },
        {
          path: "/TheMonitoring/TheEchart",
          name: "数据曲线",
          onClick() {
            router.push({ path: "/TheEchart" });
          },
        },
      ],
    },
    {
      path: "/TheLog",
      name: "日志管理",
      icon: "iconrizhi1",
      onClick() {
        router.push({ path: "/TheLog" });
      },
    },
    {
      path: "/TheSetting",
      name: "系统设置",
      icon: "iconjichupeizhi1",
      onClick() {
        router.push({ path: "/TheSetting" });
      },
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
  console.log(key, route.path);
};
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
