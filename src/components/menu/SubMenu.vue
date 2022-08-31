<template>
  <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.menuUrl">
    <template #title>
      <el-icon>
        <svg-icon :icon-class="menu.icon"></svg-icon>
      </el-icon>
      <span>{{ menu.menuName }}</span>
    </template>
    <el-menu-item
      v-for="(child, index) in menu.children"
      :key="index"
      :index="child.menuUrl"
    >
      <template #title> {{ child.menuName }}</template>
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.menuUrl">
    <el-icon>
      <svg-icon :icon-class="menu.icon"></svg-icon>
    </el-icon>
    <template #title> {{ menu.menuName }}</template>
  </el-menu-item>
</template>

<script lang="ts" setup>
const props = defineProps({
  menu: {
    required: true,
    type: Object,
  },
});
</script>

<style scoped lang="less"></style>
