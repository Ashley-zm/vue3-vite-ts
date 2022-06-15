<template>
  <div class="common-layout">
    <!-- <el-container>
      <el-header>
          <TheHeader></TheHeader>
        </el-header>
      <el-container>
        <el-aside width="200px">
          <TheMenu></TheMenu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container> -->


    <el-container>
      <el-aside width="200px">
        <TheMenu></TheMenu>
        </el-aside>
      <el-container>
        <el-header>
          <TheHeader></TheHeader>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import TheMenu from "./TheMenu.vue";
import TheHeader from "./TheHeader.vue";
</script>
<style lang="less" scoped>
.common-layout{
  width: 100%;
  height: 100%;
  .el-container{
    height: 100%;
    .el-header{
    border-bottom: 1px solid #dcdfe6;
    }
    .el-aside{
      height: 100%;
    }
  }
}
</style>