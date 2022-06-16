<template>
  <el-menu
    :default-active="activeIndex"
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
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <svg-icon icon-class="iconquyu"></svg-icon>
        </el-icon>
        <span>一张图</span>
      </template>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <svg-icon icon-class="icondangan"></svg-icon>
        </el-icon>
        <span>实时监测</span>
      </template>
      <el-menu-item index="2-1">实时数据</el-menu-item>
      <el-menu-item index="2-2">数据曲线</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">
      <el-icon>
        <svg-icon icon-class="iconrizhi1"></svg-icon>
      </el-icon>
      <template #title> 日志管理</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <svg-icon icon-class="iconjichupeizhi1"></svg-icon>
      </el-icon>
      <template #title> 系统设置</template>
    </el-menu-item>
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
// 默认激活菜单
const activeIndex = ref("1");
const emit = defineEmits(["getChange"]);
const router = useRouter();
const state = reactive({
  isCollapse: false,
  menu: [
    {
      path: "/TheMap",
      name: "一张图",
      icon: "icondangan",
      onClick() {
        router.push({ path: "/TheMap" });
      },
    },
    {
      path: "/TheMap",
      name: "实时监测",
      icon: "icondangan",
      children: [
        {
          path: "/TheMap",
          name: "实时数据",
          onClick() {
            router.push({ path: "/TheMap" });
          },
        },
        {
          path: "/TheMap",
          name: "数据曲线",
          onClick() {
            router.push({ path: "/TheMap" });
          },
        },
      ],
    },
    {
      path: "/TheMap",
      name: "日志管理",
      icon: "iconrizhi1",
      onClick() {
        router.push({ path: "/TheMap" });
      },
    },
    {
      path: "/TheMap",
      name: "系统设置",
      icon: "iconjichupeizhi1",
      onClick() {
        router.push({ path: "/TheMap" });
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
  console.log(key, keyPath);
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
