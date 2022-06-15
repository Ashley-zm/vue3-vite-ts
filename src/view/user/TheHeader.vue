<template>
  <div class="demo-type">
    <div class="user">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <p>你好，张韶涵！</p>
    </div>
    <div>
      <el-icon><CircleCloseFilled /></el-icon>
      <span>退出登录</span>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.demo-type {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .user{
    display: flex;
  }
}

// .demo-type > div:not(:last-child) {
//  border-right: 1px solid var(--el-border-color); 
// }
</style>
