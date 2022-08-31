<template>
  <div class="demo-type">
    <svg-icon class="github" icon-class="iconcsdn"></svg-icon>
    <svg-icon class="github" icon-class="icongithub"></svg-icon>
    <el-dropdown style="margin-left: 12px">
      <span class="el-dropdown-link">
        <el-badge is-dot type="primary">
          <!-- <el-button>comments</el-button> -->
          <el-avatar :src="user.avatarUrl" />
          <!-- <el-avatar :src="avatar.url" /> -->
          <!-- <el-avatar src="/images/avatar.png" /> -->
        </el-badge>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item>以{{ store.user }}的身份登录</el-dropdown-item> -->
          <el-divider style="margin: 0px" />
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改资料</el-dropdown-item>
          <el-dropdown-item>
            <el-badge is-dot type="primary"> 设置 </el-badge>
          </el-dropdown-item>
          <el-divider style="margin: 0px" />
          <el-dropdown-item @click="logout">
            <svg-icon icon-class="icontuichu"></svg-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { userStore } from "@/store";
// 用来解构赋值
import { storeToRefs } from "pinia";
import { reactive } from "vue";
const router = useRouter();
const store = userStore();
const { user } = storeToRefs(store); //此处的user是响应式数据
// const serverUrl = import.meta.env.VITE_URL;
// const avatar = reactive({
//   url: ,
// });
// avatar.url = `${serverUrl}${user.value.avatarUrl}`;
console.log("111", user.value.avatarUrl);
const logout = () => {
  store.REMOVE_INFO();
  router.push({ path: "/" });
};
</script>

<style lang="less" scoped>
.demo-type {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 18px;
  position: relative;
  .github {
    margin-left: 10px;
    width: 26px;
    height: 26px;
  }
  .example-showcase {
    .el-dropdown-link {
      cursor: pointer;
      color: var(--el-color-primary);
      display: flex;
      align-items: center;
    }
  }
}
.el-avatar {
  width: 30px;
  height: 30px;
}
</style>
