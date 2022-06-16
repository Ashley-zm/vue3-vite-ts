<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="state.menuWidth">
        <TheMenu @getChange="changeWidth"></TheMenu>
      </el-aside>
      <el-container>
        <el-header>
          <TheHeader></TheHeader>
        </el-header>
        <el-main>
          <div class="title">
            <span>{{ route.name }}</span>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "./TheHeader.vue";
import TheMenu from "./TheMenu.vue";
const route = useRoute();
const state = reactive({
  menuWidth: "200px",
});
const changeWidth = (isCollapse: Boolean) => {
  if (!isCollapse) {
    state.menuWidth = "200px";
  } else {
    state.menuWidth = "64px";
  }
};
</script>
<style lang="less" scoped>
.common-layout {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      border-bottom: 1px solid #dcdfe6;
    }
    .el-aside {
      height: 100%;
    }
    .el-main {
      padding: 0;
      .title {
        padding: 10px;
        // padding: var(--el-main-padding);
        text-align: left;
        font-weight: 700;
        border-bottom: 1px solid #dcdfe6;
      }
    }
  }
}
</style>
