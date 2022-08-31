<template>
  <el-col>
    <el-tag>标签一</el-tag>
    <el-tag type="success">标签二</el-tag>
    <el-tag type="info">标签三</el-tag>
    <el-tag type="warning">标签四</el-tag>
    <el-tag type="danger">标签五</el-tag>
  </el-col>

  <el-col class="mt10">
    <el-progress :percentage="50"></el-progress>
    <el-progress :percentage="100" :format="format"></el-progress>
    <el-progress :percentage="100" status="success"></el-progress>
    <el-progress :percentage="100" status="warning"></el-progress>
    <el-progress :percentage="50" status="exception"></el-progress>
  </el-col>

  <el-row class="mt10">
    <el-col :sm="12" :lg="6">
      <el-result icon="success" title="成功提示" subTitle="请根据提示进行操作">
        <template #extra>
          <el-button type="primary">返回</el-button>
        </template>
      </el-result>
    </el-col>
    <el-col :sm="12" :lg="6">
      <el-result icon="warning" title="警告提示" subTitle="请根据提示进行操作">
        <template #extra>
          <el-button type="primary">返回</el-button>
        </template>
      </el-result>
    </el-col>
    <el-col :sm="12" :lg="6">
      <el-result icon="error" title="错误提示" subTitle="请根据提示进行操作">
        <template #extra>
          <el-button type="primary">返回</el-button>
        </template>
      </el-result>
    </el-col>
    <el-col :sm="12" :lg="6">
      <el-result icon="info" title="信息提示" subTitle="请根据提示进行操作">
        <template #extra>
          <el-button type="primary">返回</el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CTag",
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
  },
}
</script>

<style scoped>

</style>
