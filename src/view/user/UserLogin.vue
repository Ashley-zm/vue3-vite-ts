<template>
  <div class="container">
    <div class="common-layout">
      <el-container>
        <el-main>
          <div class="title">
            <div class="logo">
            <img src="/images/logo.jpg"/>
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
            <el-form-item label="用户名" prop="user">
              <el-input v-model="ruleForm.user" />
            </el-form-item>
            <el-form-item label="密 码" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)" style="width:320px">登录</el-button>
              <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
// import { userStore } from "@/store";
import {useRouter} from 'vue-router'
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
export default {
  setup() {
    const router = useRouter()
    // const userStore = userStore();
    const ruleFormRef = ref<FormInstance>();
    //校验密码
    const validateUser = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      }  else {
        callback();
      }
    };
    //校验密码
    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } 
      // else if (value !== ruleForm.pass) {
      //   callback(new Error("Two inputs don't match!"));
      // }
       else {
        callback();
      }
    };

    // 数据
    const ruleForm = reactive({
      user: "",
      pass: "",
    });
    // 校验规则
    const rules = reactive({
      pass: [{ validator: validatePass, trigger: "blur" }],
      user: [{ validator: validateUser, trigger: "blur" }],
    });
    // 数据提交
    const submitForm = (formEl: FormInstance | undefined) => {
      console.log("cest");

      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");          
          router.push({ path: '/home' })
        } else {
          console.log("error submit!");
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
  background-image: url('/images/background.png');
  // background-image: url('../../../public/images/background.jpg');
  background-size: 100% 100%;

  .common-layout {
    position: relative;
    left: 10%;
    width: 30%;
    .title{
      display: flex;
      justify-content: center;
      align-items: center;
      .logo{
        width: 20%;
        img{
          width: 40%;
        }
      }
    }
  }
}
</style>
