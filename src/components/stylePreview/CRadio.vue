<template>
  <el-row>
    <div>
      <el-radio v-model="radio1" label="1">备选项1</el-radio>
      <el-radio v-model="radio1" label="2">备选项2</el-radio>
    </div>
    <div>
      <el-checkbox v-model="checked1" label="备选项1"></el-checkbox>
      <el-checkbox v-model="checked2" label="备选项2"></el-checkbox>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "CRadio",
  data() {
    return {
      radio1: "1",
      checked1: true,
      checked2: false,
    };
  },
};
</script>

<style scoped>
div {
  margin-right: 10px;
}
</style>
