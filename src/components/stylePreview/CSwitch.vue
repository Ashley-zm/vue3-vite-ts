<template>
  <el-col>
    <el-switch v-model="value1" active-text="按月付费" inactive-text="按年付费"></el-switch>
  </el-col>
  <el-col class="mt10">
    <el-slider v-model="value2"></el-slider>
  </el-col>
</template>

<script>
export default {
  name: "CSwitch",
  data () {
    return {
      value1: false,
      value2: 1,
    }
  },
}
</script>

<style scoped>

</style>
