<!--填空 -->
<template>
  <div class="fill">
    <el-input
      size="mini"
      prop="question"
      v-model="gradeList.Title"
      placeholder="请输入题目"
    ></el-input>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const props = defineProps({
  Entry: {
    type: Object,
    default: {},
  },
  indexQ: {
    type: Number,
  },
});
const gradeList = reactive({
  Type: "4", //类型
  TypeName: "填空", //类型名称
  Title: "", //问题的名称
  Remind: 1, //评分低时是否推送
  RemindScore: 3, //推送的最低评分
  Item: [],
});
const addGrade = () => {
  props.Entry.Topics.push(gradeList);
};
defineExpose({ addGrade });
const emit = defineEmits(["questionData"]);
const endData = () => {
  emit("questionData", gradeList);
};
</script>
<style lang="less" scoped>
.fill {
  padding: 10px;
  width: 100%;
  height: 40px;
  background-color: #fafafa;
  border: 0.5px solid #ebeaea;
  margin-bottom: 20px;
  position: relative;
  .el-input {
    width: 200px;
    position: absolute;
    left: 15px;
  }
}
</style>
