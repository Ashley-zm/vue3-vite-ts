<template>
  <el-col>
    <el-alert title="成功提示的文案" type="success" effect="dark"> </el-alert>
    <el-alert title="消息提示的文案" type="info" effect="dark"> </el-alert>
    <el-alert title="警告提示的文案" type="warning" effect="dark"> </el-alert>
    <el-alert title="错误提示的文案" type="error" effect="dark"> </el-alert>
  </el-col>

  <el-col class="mt10">
    <el-button plain @click="open1"> 成功</el-button>
    <el-button plain @click="open2"> 警告</el-button>
    <el-button plain @click="open3"> 消息</el-button>
    <el-button plain @click="open4"> 错误</el-button>
  </el-col>
</template>

<script>
import {ElMessage, ElNotification } from 'element-plus'

export default {
  name: "CAlert",
  data() {
    return {}
  },
  methods: {
    Message1() {
      ElMessage.success({
        message: '恭喜你，这是一条成功消息',
        type: 'success',
      })
    },
    Message2() {
      ElMessage.warning({
        message: '警告哦，这是一条警告消息',
        type: 'warning',
      })
    },
    Message3() {
      ElMessage('这是一条消息提示')
    },
    Message4() {
      ElMessage.error('错了哦，这是一条错误消息')
    },

    open1() {
      ElNotification({
        title: '成功',
        message: '这是一条成功的提示消息',
        type: 'success',
      })
    },

    open2() {
      ElNotification({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning',
      })
    },

    open3() {
      ElNotification.info({
        title: '消息',
        message: '这是一条消息的提示消息',
      })
    },

    open4() {
      ElNotification.error({
        title: '错误',
        message: '这是一条错误的提示消息',
      })
    },
  }
}
</script>

<style scoped>

</style>
