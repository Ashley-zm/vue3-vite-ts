<template>
  <el-sub-menu v-if="menu.children" :index="menu.path">
    <template #title>
      <el-icon>
        <svg-icon :icon-class="menu.icon"></svg-icon>
      </el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <el-menu-item
      v-for="(child, index) in menu.children"
      :key="index"
      :index="child.path"
    >
      <template #title> {{ child.name }}</template>
    </el-menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">
    <el-icon>
      <svg-icon :icon-class="menu.icon"></svg-icon>
    </el-icon>
    <template #title> {{ menu.name }}</template>
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
