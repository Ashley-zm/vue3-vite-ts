<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script setup lang="ts">
//  ConfigProvider 用于全局配置国际化的设置
import { ElConfigProvider } from "element-plus";
// 引用element 中文样式
import zhCn from "element-plus/lib/locale/lang/zh-cn";
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}

:root {
  --theme_color: #fff;
  --fontSize: 12px;
}
</style>
