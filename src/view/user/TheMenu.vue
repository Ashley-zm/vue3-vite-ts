<template>
  <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="state.isCollapse"
    @select="handleSelect">
    <div class="title-banner">
      <img v-show="!state.isCollapse" src="/images/title.jpg" />
      <img v-show="state.isCollapse" src="/images/logo.jpg" style="width: 35px;margin-top: 12px;" />
    </div>
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon>
        <icon-menu />
      </el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon>
        <document />
      </el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>Navigator Four</template>
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
import { reactive } from 'vue'
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
// 默认激活菜单
const activeIndex = ref('1')
const state = reactive({
  isCollapse: false,
})
// 菜单开关
const handleChange = () => {
  state.isCollapse = !state.isCollapse
}
// 菜单选择
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;

  .title-banner {
    height: 60px;
    border-bottom: 1px solid #dcdfe6;
    h4{
      margin: 0px;
    }
  }

  .is-collapse {
    position: absolute;
    bottom: 60px;
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
