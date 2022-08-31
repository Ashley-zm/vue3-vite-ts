<template>
  <el-col>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>卡片名称</span>
          <el-button class="button">操作按钮</el-button>
        </div>
      </template>

      <el-row :gutter="10">
        <el-col :span="12">
          <div v-for="o in 4" :key="o" class="text item">{{ '列表内容 ' + o }}</div>
        </el-col>
        <el-col :span="12">
          <el-timeline>
            <el-timeline-item v-for="(activity, index) in activities"
                              :key="index"
                              :timestamp="activity.timestamp">
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>

<script>
export default {
  name: "CTimeline",
  data() {
    return {
      activities: [
        {
          content: '活动按期开始',
          timestamp: '2018-04-15',
        },
        {
          content: '通过审核',
          timestamp: '2018-04-13',
        },
        {
          content: '创建成功',
          timestamp: '2018-04-11',
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>
