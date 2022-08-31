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
            class="demo-ruleForm"
          >
            <el-form-item prop="userName">
              <el-input
                :prefix-icon="User"
                v-model="ruleForm.userName"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :prefix-icon="Lock"
                v-model="ruleForm.password"
                type="password"
                autocomplete="off"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item prop="verifyVal">
              <el-input
                style="width: 150px !important"
                :prefix-icon="Key"
                v-model="ruleForm.verifyVal"
                placeholder="请输入验证码"
              />
              <div id="v_container"></div>
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

<script lang="ts" setup>
import GVerify from "@/common/verify.js";
import { User, Lock, Key } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref, Ref } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
// 用户登录接口
import { userLogin } from "@/api/user";
//pinia 数据 用户数据
import { userStore } from "@/store";
const router = useRouter();
// 实例化容器
const store = userStore();
const ruleFormRef = ref<FormInstance>();
let verifyCode: Ref<GVerify | null> = ref(null);
onMounted(() => {
  verifyCode.value = new GVerify("v_container");
});
//校验用户名
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
//校验验证码
const validateVerify = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入验证码！"));
  } else {
    if (verifyCode.value && !verifyCode.value.validate(ruleForm.verifyVal)) {
      callback(new Error("验证码错误！"));
    } else {
      callback();
    }
  }
};
// 表单数据
const ruleForm = reactive({
  userName: "",
  password: "",
  verifyVal: "",
});
// 校验规则
const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  userName: [{ validator: validateUser, trigger: "blur" }],
  verifyVal: [{ validator: validateVerify, trigger: "blur" }],
});
// 数据提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      userLogin({
        userName: ruleForm.userName,
        password: ruleForm.password,
      })
        .then((res) => {
          if (res.data.flag) {
            let data = res.data.data[0];
            let token = res.data.token;
            let user = data;
            const serverUrl = import.meta.env.VITE_URL;
            user.avatarUrl = serverUrl + user.avatarUrl;
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
        })
        .catch((error) => {
          if (error.message === "Network Error") {
            ElMessage.error("网络错误！");
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
    left: 33%;
    width: 340px;
    border: 1px solid #e8ecfacb;
    border-radius: 18px;
    box-shadow: 0px 12px 19px;
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
    .demo-ruleForm {
      #v_container {
        margin-left: 20px;
        width: 120px;
        height: 30px;
        border: 1px solid #dddfe6e0;
      }
    }
  }
}
</style>
