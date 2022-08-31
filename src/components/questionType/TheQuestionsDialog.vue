<template>
  <div style="height: 100%">
    <el-dialog title="选择题目类型" v-model="data.dialogVisible" width="54%">
      <div class="questionList">
        <div class="question" @click="addQuestion(1)">
          <div class="top clearfix"><span>评分</span></div>
          <div class="question_content">
            <el-rate disabled v-model="data.value1" text-color="#ff9900"> </el-rate>
          </div>
          <div class="icon_right">
            <i
              style="font-size: 25px; font-weight: 900; color: #409eff"
              class="el-icon-check"
            ></i>
          </div>
        </div>
        <div class="question" @click="addQuestion(2)">
          <div class="top clearfix"><span>多选</span></div>
          <div class="question_content">
            <div class="list">
              <p>□ ———</p>
              <p>□ ———</p>
            </div>
          </div>
          <div class="icon_right">
            <i
              style="font-size: 25px; font-weight: 900; color: #409eff"
              class="el-icon-check"
            ></i>
          </div>
        </div>
        <div class="question" @click="addQuestion(3)">
          <div class="top clearfix"><span>评分+多选</span></div>
          <div class="question_content">
            <el-rate disabled v-model="data.value2" text-color="#FFBA05"> </el-rate>
            <div class="list">
              <p>□ ———</p>
              <p>□ ———</p>
            </div>
          </div>
          <div class="icon_right">
            <i
              style="font-size: 25px; font-weight: 900; color: #409eff"
              class="el-icon-check"
            ></i>
          </div>
        </div>
        <div class="question" @click="addQuestion(4)">
          <div class="top clearfix"><span>填空</span></div>
          <div class="question_content">
            <div class="list">
              <p style="margin-top: 35px">—————</p>
            </div>
          </div>
          <div class="icon_right">
            <i
              style="font-size: 25px; font-weight: 900; color: #409eff"
              class="el-icon-check"
            ></i>
          </div>
        </div>
      </div>
      <GradeType v-show="false" :Entry="Entry" ref="newGrade" />
      <FillType v-show="false" :Entry="Entry" ref="newFill" />
      <GradeSelectType v-show="false" :Entry="Entry" ref="gSelect" />
      <ChoicesType v-show="false" :Entry="Entry" ref="newChoice" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import GradeSelectType from "@/components/questionType/GradeSelectType.vue";
import ChoicesType from "@/components/questionType/ChoicesType.vue";
import FillType from "@/components/questionType/FillType.vue";
import GradeType from "@/components/questionType/GradeType.vue";

import { reactive, ref } from "vue";
const props = defineProps({
  Entry: {
    type: Object,
    default: {},
  },
});
const data = reactive({
  dialogVisible: false,
  value1: 4,
  value2: 3,
});
const isShow = () => {
  data.dialogVisible = true;
};
defineExpose({ isShow });
// 添加问题
const emit = defineEmits(["question"]);
const newGrade = ref();
const newChoice = ref();
const gSelect = ref();
const newFill = ref();
const addQuestion = (type: Number) => {
  switch (type) {
    case 1:
      // 给父组件传值说明已选择任意一题
      emit("question", type);
      // 给子组件进行添加
      newGrade.value.addGrade();
      console.log("评分");
      data.dialogVisible = false;
      break;
    case 2:
      newChoice.value.addGrade();
      console.log("多选");
      data.dialogVisible = false;
      break;
    case 3:
      gSelect.value.addGrade();
      console.log("评分+多选");
      data.dialogVisible = false;
      break;
    case 4:
      newFill.value.addGrade();
      console.log("填空");
      data.dialogVisible = false;
      break;
    default:
      data.dialogVisible = false;
      break;
  }
};
</script>

<style lang="less" scoped>
.questionList {
  height: 40vh;
  overflow: auto;
  .question {
    width: 150px;
    height: 140px;
    float: left;
    border: 1px solid #f0f0f0;
    margin: 2%;
    cursor: pointer;
    position: relative;
    .top {
      height: 40px;
      line-height: 40px;
      padding-left: 15px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 14px;
      font-weight: bold;
      color: #2d303a;
      background-color: #f6f6f6;
    }
    .question_content {
      .list {
        font-size: 22px;
        color: #dcdbdbc2;
        p {
          margin: 0px;
        }
      }
    }
    .icon_right {
      width: 30px;
      height: 30px;
      display: none;
      position: absolute;
      bottom: -4px;
      right: 0px;
      border-width: 0 38px 38px;
    }
  }
}
.question:hover {
  background-color: #faf9f99d;
}
.question:hover .icon_right {
  display: block;
}
</style>
