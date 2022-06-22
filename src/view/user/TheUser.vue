<template>
  <div class="menu-region">
    <el-form :inline="true" ref="formRef" :model="queryData" label-width="80px">
      <el-form-item label-width="70px" label="用户名称">
        <el-input
          v-model="queryData.filterWords"
          style="width: 206px; margin-right: 34px"
          placeholder="请输入用户名/登录名"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table-region">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="60px" align="center" />
      <el-table-column type="index" width="75px" label="序号" align="center" />
      <el-table-column
        :label="column.label"
        show-overflow-tooltip
        align="center"
        v-for="column in columnList"
        :key="column.prop"
        :width="column.width"
        :fixed="column.fixed"
        :prop="column.prop"
      >
        <template #default="scope">
          <!-- scale -->
          <div v-if="column.prop === 'Operations'">
            <el-button link type="primary" size="small" @click="handleClick"
              >详情</el-button
            >
            <el-button link type="primary" size="small">编辑</el-button>
          </div>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { columnList } from "./config.js";
import { getAllUsers } from "@/api/user.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();

const queryData = reactive({
  filterWords: "",
});
let tableData = ref([]);
onMounted(() => {
  handleQuery();
});
const handleQuery = () => {
  getAllUsers().then((res) => {
    if (res.data.flag) {
      console.log(res.data.data);
      tableData.value = res.data.data;
      console.log(tableData);
    } else {
      router.push({ path: "/" });
      ElMessage.error(res.data.msg);
    }
  });
};
const handleClick = () => {
  console.log("click");
};
</script>
<style lang="less" scoped>
.menu-region {
  text-align: left;
  margin: 10px;
  background-color: #fafafa;
  padding: 15px 0px 0px 10px;
  border: 1px solid #e1e1e1a6;
}
.table-region {
  padding: 15px;
}
</style>
