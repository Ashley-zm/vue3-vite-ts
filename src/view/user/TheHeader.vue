<template>
  <div class="demo-type">
    <div>
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </div>
    <div>
      <el-icon><CloseBold /></el-icon>
      <span>退出登录</span>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.demo-type {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  /* border-right: 1px solid var(--el-border-color); */
}
</style>
