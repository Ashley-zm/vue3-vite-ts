<template>
  <div ref="containerT" class="containerT">
    <div class="menu">
      <div class="menu-region">
        <el-form :inline="true" ref="formRef" :model="queryData" label-width="80px">
          <el-form-item label-width="70px" label="关键词">
            <el-input
              v-model="queryData.filterWords"
              style="width: 206px; margin-right: 34px"
              placeholder="请输入问卷名称/编码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              v-has="'IrrigationArchives_search'"
              @click="handleQuery"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <div class="menu-button">
    <el-button type="primary" @click="handleAdd" :icon="Plus" round />

    <el-button type="danger" @onClick="handleAllDelect" :icon="Delete" circle />
  </div>
  <div :style="defaultHeight" class="container-content" ref="containerContent">
    <el-table
      :data="tableData"
      :max-height="tableHeight"
      border
      style="width: 100%"
      @select="selectColumn"
      :header-cell-style="table.tableStyle"
      v-loading="loading"
      @select-all="selectAllColumn"
    >
      <el-table-column type="selection" width="60px" align="center" />
      <el-table-column type="index" width="75px" label="序号" align="center" />
      <el-table-column
        :label="column.label"
        show-overflow-tooltip
        align="center"
        :width="column.width"
        v-for="column in columnList"
        :key="column.prop"
        :fixed="column.fixed"
        :prop="column.prop"
      >
        <template #default="scope">
          <!-- scale -->
          <div v-if="column.prop === 'operate'">
            <svg-icon
              :className="'icon-bianji'"
              icon-class="iconbianji"
              @onClick="clickEdit(scope.row)"
            ></svg-icon>
            <svg-icon
              :className="'icon-shanchu'"
              icon-class="iconshanchu"
              @onClick="clickDelete(scope.row)"
            ></svg-icon>
          </div>
          <span
            v-else-if="column.prop === 'name'"
            style="color: #007ce4; cursor: pointer"
            @click="toDetail(scope.row)"
            >{{ scope.row[column.prop] }}</span
          >
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 18px">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        small="small"
        background
        layout="prev, pager, next, sizes, total, jumper"
        :total="pageTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete, Plus } from "@element-plus/icons-vue";
import SvgIcon from "@/components/SvgIcon/SvgIcon.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import * as config from "./config.js";
import axios from "axios";
import { ref, reactive, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
const currentPage = ref(1);
const pageSize = ref(10);
const pageTotal = ref(1);
const router = useRouter();
const loading = ref(false);
// 获取dom对象
const containerT = ref(null);
const defaultHeight = reactive({
  height: "",
});
const tableHeight = ref(0);
const containerContent = ref(null);
// 动态设置表格高度
onMounted(() => {
  defaultHeight.height = `calc(100% - ${containerT.value.clientHeight + 40}px)`;
  // 自适应表格高度
  nextTick(() => {
    tableHeight.value = containerContent.value.clientHeight - 70;
  });
});
const table = reactive({
  tableStyle: {
    "border-right": "1px solid #e2e2e4",
    "border-bottom": "1px solid #e2e2e4",
    padding: "5px 10px",
    "font-size": "13px",
    color: "#7f868c",
    "background-color": "#eaeef1",
  },
});
const queryData = reactive({
  regionName: "全部",
  region: "",
  orgDept: "",
  filterWords: "",
});
const reginOptions = ref([]);
// 获取表格数据
// 表格列
const columnList = config.columnList;
const tableData = ref([]);
const handleQuery = () => {
  loading.value = true;
  axios
    .get("/base/irrigation/searchList.do", {
      params: {
        filterWords: queryData.filterWords,
        pageSize: pageSize.value,
        pageNum: currentPage.value,
      },
    })
    .then((res) => {
      if (res) {
        tableData.value = res.data;
        // pageTotal.value = res.total;
      }
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
      ElMessage({
        type: "warning",
        message: "网络异常",
      });
    });
};
handleQuery();
const handleSizeChange = () => {
  handleQuery();
};
const handleCurrentChange = () => {
  handleQuery();
};
// 删除
const deleteData = (id: any) => {
  ElMessageBox.confirm("确认删除吗？", " ", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    // axios
    //   .post("/base/irrigation/delete.do", {
    //     ids: id,
    //   })
    //   .then((res) => {
    //     if (res.flag) {
    //       ElMessage({
    //         type: "success",
    //         message: "删除成功",
    //       });
    //       handleQuery();
    //     }
    //   });
  });
};
// 编辑
const clickEdit = (row: any) => {
  //   router.push({
  //     path: "/IrrigationArchives/operate",
  //     query: {
  //       id: row.id,
  //       type: "edit",
  //       name: "灌区档案",
  //     },
  //   });
};
// 新增
const handleAdd = () => {
  router.push({
    path: "/TheNewQuestions",
    query: {
      type: "add",
      name: "创建问卷",
    },
  });
};
// 详情
const toDetail = (row: any) => {
  //   router.push({
  //     path: "/IrrigationArchivesDetail",
  //     query: {
  //       id: row.id,
  //       type: "detail",
  //       name: "灌区档案",
  //     },
  //   });
};

// 单选删除
const clickDelete = (row: any) => {
  deleteData(row.id);
};

// 多选删除
let selectionRow: any[] = [];
const selectColumn = (selection: any[]) => {
  selectionRow = selection;
};
// 全选删除
const selectAllColumn = (selection: any[]) => {
  selectionRow = selection;
};

const handleAllDelect = () => {
  if (selectionRow.length <= 0) {
    ElMessage.error("请选择一条或多条删除");
    return;
  }
  const ids = selectionRow.map((item) => item.id).join(",");
  deleteData(ids);
};
</script>

<style scoped lang="less">
.el-form--inline .el-form-item {
  display: inline-flex;
  vertical-align: middle;
  margin-right: 6px;
}
.container-content {
  background: #fff;
  padding: 0px 16px 10px;
}
.el-form-item--default {
  --font-size: 14px;
  --el-form-label-font-size: var(--font-size);
  margin-bottom: 0px;
}
.el-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  width: 60px;
  height: 28px;
  background: #11aef0;
  border-radius: 2px;
  /* background-color: var(--el-button-bg-color,var(--el-color-white)); */
  border: var(--el-border-base);
  /* border-color: var(--el-button-border-color,var(--el-border-color-base)); */
  color: var(--el-button-text-color, var(--el-text-color-regular));
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: var(--el-button-font-weight);
  -webkit-user-select: none;
  user-select: none;
  vertical-align: middle;
  padding: 0px 15px;
  font-size: var(--el-font-size-base, 14px);
  border-radius: var(--el-border-radius-base);
}
</style>
