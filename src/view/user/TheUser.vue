<template>
  <div class="menu-region">
    <el-form :inline="true" ref="formRef" :model="queryData" label-width="80px">
      <el-form-item label-width="70px" label="用户名称">
        <el-input
          @change="handleQuery"
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
            <el-button
              link
              type="primary"
              size="small"
              s
              @click="handleClick(scope.row, false)"
            >
              <el-icon :size="18">
                <Edit />
              </el-icon>
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(scope.row, false)"
            >
              <el-icon :size="18"><Delete /></el-icon>
            </el-button>
          </div>
          <span
            v-else-if="column.prop === 'userName'"
            @click="handleClick(scope.row, true)"
            style="color: #409eff; cursor: pointer"
            >{{ scope.row[column.prop] }}</span
          >
          <span v-else-if="column.prop === 'sex'">
            {{ scope.row[column.prop] === 1 ? "女" : "男" }}</span
          >
          <span v-else-if="column.prop === 'avatarUrl'">
            <el-avatar :src="`${serverUrl}${scope.row[column.prop]}`" />
          </span>
          <span v-else>{{ scope.row[column.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      :pageCurrent="pageObj.pageCurrent"
      :page-size="pageObj.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageObj.total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 弹出框 -->
  <el-dialog
    width="600px"
    v-model="dialogFormVisible"
    :title="`用户信息 - ${isDetail ? '详情' : '编辑'}`"
  >
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="form"
      style="display: flex; flex-flow: wrap"
    >
      <el-form-item prop="loginName" label="登录名" :label-width="formLabelWidth">
        <el-input
          style="width: 170px"
          :disabled="isDetail"
          v-model="form.loginName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="userName" label="用户名" :label-width="formLabelWidth">
        <el-input
          style="width: 170px"
          :disabled="isDetail"
          v-model="form.userName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
        <el-select style="width: 170px" :disabled="isDetail" v-model="form.sex">
          <el-option label="女" :value="1" />
          <el-option label="男" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input
          style="width: 170px"
          :disabled="isDetail"
          v-model="form.email"
          autocomplete="off"
        />
      </el-form-item>
      <!-- <el-form-item label="组织" :label-width="formLabelWidth">
        <el-select
          style="width: 170px"
          :disabled="isDetail"
          v-model="form.groupID"
          @change="handleRoleQuery"
        >
          <el-option
            v-for="(item, index) in groupOptions"
            :key="index"
            :label="item.groupsName"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-select style="width: 170px" :disabled="isDetail" v-model="form.roleId">
          <el-option
            v-for="(item, index) in roleOptions"
            :key="index"
            :label="item.rName"
            :value="item.rid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="头像" :label-width="formLabelWidth">
        <el-upload
          :disabled="isDetail"
          class="avatar-uploader"
          :action="`${serverUrl}/vite/user/uploadAvatar.do`"
          :show-file-list="false"
          :data="form"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove"
          :on-error="sendErr"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer v-if="!isDetail">
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from "vue";
import { columnList } from "./config.js";
import { getAllUsers, getUserDetail, getAllGroups, getRoles,getAllRoles } from "@/api/user.js";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { userStore } from "@/store";
// import type { FormInstance, FormRules } from 'element-plus'
const store = userStore();

// 表单类型定义接口

interface Form {
  // groupID: number;
  // groupsName: string;
  id: number;
  loginName: string;
  userName: string;
  password: string;
  sex: number;
  email: string;
  address: string;
  roleId: number;
  roleName: string;
  [props: string]: any
  // avatarUrl: string;
}
const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  loginName: [
    { required: true, message: "请输入登录名", trigger: "blur" },
    { min: 2, max: 4, message: "长度必须在2～4之间", trigger: "blur" },
  ],
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  email: [
    { type: "date", required: true, message: "请输入邮箱号", trigger: "blur" },
    {
      pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
      message: "请输入正确的邮箱",
      trigger: "blur",
    },
  ],
});
const router = useRouter();
//查询条件
const queryData = reactive({
  filterWords: "",
});
const pageObj = reactive({
  pageCurrent: 1,
  pageSize: 10,
  total: 10,
});
const serverUrl = import.meta.env.VITE_URL;
// 所有用户的数据
const tableData = ref(Array());
// 所有组织
const groupOptions = ref(Array());
// 所有角色
const roleOptions = ref(Array());
// 弹出框 标识
const dialogFormVisible = ref(false);
const isDetail = ref(true);
// lable width
const formLabelWidth = "80px";
let form = ref<Form>({
  // groupID: 1,
  // groupsName: "",
  id: 1,
  loginName: "",
  userName: "",
  password: "",
  sex: 1,
  email: "",
  address: "",
  roleId: 1,
  roleName: "",
  // avatarUrl: "",
});
// 头像地址
const imageUrl = ref("");

onMounted(() => {
  handleQuery();
});
// 查询所有用户
const handleQuery = () => {
  getAllUsers({
    keyWord: queryData.filterWords,
    pageCurrent: pageObj.pageCurrent,
    pageSize: pageObj.pageSize,
  }).then((res) => {
    if (res.data.flag) {
      console.log(res);
      
      tableData.value = res.data.data.list;
      pageObj.total = res.data.data.total;
    } else {
      // router.push({ path: "/" });
      ElMessage.error(res.data.msg);
    }
  });
};
// 修改每页多少条数据时
const handleSizeChange = (val: number) => {
  pageObj.pageSize = val;
  handleQuery();
};
// 修改当前分页时
const handleCurrentChange = (val: number) => {
  pageObj.pageCurrent = val;
  handleQuery();
};
// 查询所有组织
const handleGroupsQuery = () => {
  getAllGroups().then((res) => {
    if (res.data.flag) {
      groupOptions.value = res.data.data;
    } else {
      router.push({ path: "/" });
      ElMessage.error(res.data.msg);
    }
  });
};
// 根据组织查询组织下的角色
const handleRoleQuery = (groupId: number) => {
  getRoles({ groupId: groupId }).then((res) => {
    if (res.data.flag) {
      roleOptions.value = res.data.data;
    } else {
      router.push({ path: "/" });
      ElMessage.error(res.data.msg);
    }
  });
};
// 查询所有的角色
const handleAllRoleQuery = () => {
  getAllRoles().then((res) => {
    if (res.data.flag) {
      roleOptions.value = res.data.data;
    } else {
      router.push({ path: "/" });
      ElMessage.error(res.data.msg);
    }
  });
};
handleAllRoleQuery()
// 查看详情 编辑
const handleClick = (row: Form, isORnot: boolean) => {
  // handleGroupsQuery();
  isDetail.value = isORnot;
  dialogFormVisible.value = true;  
  Object.keys(form.value).forEach((key) =>{ 
    // @ts-ignore
    form.value[key] =row[key] || form.value[key]
  })
  
  console.log(form.value);
  
  // getUserDetail({ id: toRaw(row).id }).then((res) => {
  //   if (res.data.flag) {
  //     let data = res.data.data[0];
  //     if (data.avatarUrl) {
  //       data.avatarUrl = data.avatarUrl.replace("public", "");
  //       imageUrl.value = `${serverUrl}${data.avatarUrl}`;
  //     } else {
  //       imageUrl.value = "";
  //     }
  //     form.value = data;
  //     handleRoleQuery(form.value.groupID);
  //   } else {
  //     router.push({ path: "/" });
  //     ElMessage.error(res.data.msg);
  //   }
  // });
};
// 头像上传成功
const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  if (Number(response.data.id) === store.$state.user.id) {
    store.SET_AVATARURL(response.data.path.replace("public", ""));
  }
  handleQuery();
};
//删除图片目前error
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log("上传图片成功", uploadFile, uploadFiles);
};
// 上传失败
const sendErr: UploadProps["onError"] = (onError) => {
  ElMessage.error(onError);
};
// 头像上传的条件判断
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/png") {
    ElMessage.error("Avatar picture must be png format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
// 提交表单

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
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
  margin: 10px;
}
.el-table {
  --el-table-header-bg-color: #e9eced61;
}

.avatar-uploader .avatar {
  width: 80px;
  height: 80px;
  display: block;
  border-radius: 40px;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
  border: 1px dashed;
  border-radius: 40px;
}
</style>
