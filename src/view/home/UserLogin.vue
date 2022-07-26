<template>
  <div class="container">
    <div class="common-layout">
      <el-container>
        <el-main>
          <div class="title">
            <div class="logo">
              <img src="/images/logo.jpg" />
            </div>
            <h3>后台管理系统</h3>
          </div>
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="ruleForm.userName" />
            </el-form-item>
            <el-form-item label="密 码" prop="password">
              <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm(ruleFormRef)"
                style="width: 320px"
                >登录</el-button
              >
              <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
// 用户登录接口
import { userLogin } from "@/api/user";
//pinia 数据 用户数据
import { userStore } from "@/store";
export default {
  setup() {
    const router = useRouter();
    // 实例化容器
    const store = userStore();
    const ruleFormRef = ref<FormInstance>();
    //校验密码
    const validateUser = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      } else {
        callback();
      }
    };
    //校验密码
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      }
      // else if (value !== ruleForm.password) {
      //   callback(new Error("Two inputs don't match!"));
      // }
      else {
        callback();
      }
    };
    // 表单数据
    const ruleForm = reactive({
      userName: "",
      password: "",
    });
    // 校验规则
    const rules = reactive({
      password: [{ validator: validatePass, trigger: "blur" }],
      userName: [{ validator: validateUser, trigger: "blur" }],
    });
    // 数据提交
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          userLogin({
            userName: ruleForm.userName,
            password: ruleForm.password,
          }).then((res) => {
            if (res.data.flag) {
              let data = res.data.data[0];
              let token = res.data.token;
              let user = data;
              // let user = data.loginName;
              //存储token
              store.SET_TOKENN(token);
              //存储user
              store.SET_USER(user);
              router.push({
                path: "/home",
              });
            } else {
              ElMessage.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    };
    // 重置
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    return {
      // user,
      ruleForm,
      rules,
      ruleFormRef,
      submitForm,
      resetForm,
    };
  },
};
</script>
<style lang="less" scoped>
.container::-webkit-scrollbar {
  display: none;
  width: 0px;
  /* Chrome Safari */
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
  background-image: url("/images/background.png");
  // background-image: url('../../../public/images/background.jpg');
  background-size: 100% 100%;

  .common-layout {
    position: relative;
    left: 10%;
    width: 30%;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      .logo {
        width: 20%;
        img {
          width: 40%;
        }
      }
    }
  }
}
</style>
