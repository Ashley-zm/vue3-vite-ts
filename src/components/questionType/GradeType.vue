<!--评分 -->
<template>
  <div class="rate">
    <el-input
      size="mini"
      change="notNull()"
      v-model="gradeList.Title"
      placeholder="请输入题目"
    ></el-input>
    <span class="comment"
      >提醒设置：当评分 ≤
      <el-select style="width: 60px" size="mini" v-model="gradeList.RemindScore">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" selected="selected" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
      星，发送给相关负责人
    </span>
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
  Type: "1", //类型
  TypeName: "评分", //类型名称
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
.rate {
  padding: 10px;
  border: 0.5px solid #ebeaea;
  width: 100%;
  height: 75px;
  background-color: #fafafa;
  position: relative;
  .el-input {
    width: 200px;
    position: absolute;
    left: 15px;
  }
  .comment {
    display: block;
    font-size: 13px;
    padding: 5px;
    color: #606266;
    position: absolute;
    top: 48px;
    left: 15px;
  }
}
</style>
