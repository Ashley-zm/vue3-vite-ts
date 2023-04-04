<template>
  <el-sub-menu
    v-if="menu.children && menu.children.length > 0"
    :index="menu.code"
    v-show="hasPerm(menu.code)"
  >
    <template #title>
      <el-icon>
        <svg-icon :icon-class="menu.icon"></svg-icon>
      </el-icon>
      <span>{{ menu.MenuName }}</span>
    </template>
    <template v-for="(child, index) in menu.children" :key="index">
      <el-menu-item  :index="child.code" v-show="hasPerm(child.code)">
        <template #title> {{ child.MenuName }}</template>
      </el-menu-item>
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.code" v-show="hasPerm(menu.code)">
    <el-icon>
      <svg-icon :icon-class="menu.icon"></svg-icon>
    </el-icon>
    <template #title> {{ menu.MenuName }}</template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import  {hasPerm}  from "@/common/tools.js";

const props = defineProps({
  menu: {
    required: true,
    type: Object,
  },
});
</script>

<style scoped lang="less"></style>
