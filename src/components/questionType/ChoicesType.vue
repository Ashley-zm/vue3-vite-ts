<!--多选 -->
<template>
  <div class="select">
    <div class="graSelect">
      <div class="inp">
        <el-input
          class="topic"
          size="mini"
          v-model="data.gradeList.Title"
          placeholder="请输入题目"
        ></el-input>
      </div>
      <div
        class="selectOpt"
        v-for="(list, index) in data.gradeList.Item[0].Options"
        :key="index"
      >
        <div :oid="index" v-if="index === data.gradeList.Item[0].Options.length - 1">
          <span>多选{{ index + 1 }}</span>
          <el-input
            size="mini"
            v-model="list.label"
            style="width: 220px; margin-right: 10px"
            placeholder="请输入内容"
          ></el-input>
          <el-button
            type="danger"
            v-if="data.gradeList.Item[0].Options.length > 2"
            @click="delOption($event)"
            plain
            >删除选项</el-button
          >
          <!-- <el-link
            v-if="data.gradeList.Item[0].Options.length > 2"
            @click="delOption($event)"
            style="font-size: 12px; line-height: 14px"
            >删除</el-link
          > -->
          <el-button
            v-if="data.gradeList.Item[0].Options.length < 6"
            @click="addOption($event)"
            type="primary"
            plain
            >添加选项</el-button
          >
          <!-- <el-link
            v-if="data.gradeList.Item[0].Options.length < 6"
            @click="addOption($event)"
            style="font-size: 12px; line-height: 14px"
            >添加</el-link
          > -->
        </div>
        <div :oid="index" v-else>
          <span>多选{{ index + 1 }}</span>
          <el-input
            size="mini"
            style="width: 220px; margin-right: 10px"
            v-model="list.label"
            placeholder="请输入内容"
          ></el-input>
          <el-button
            type="danger"
            v-if="data.gradeList.Item[0].Options.length > 2"
            @click="delOption($event)"
            plain
            >删除选项</el-button
          >
          <!-- <el-link
            v-if="data.gradeList.Item[0].Options.length > 2"
            @click="delOption($event)"
            style="font-size: 12px; line-height: 14px"
            >删除</el-link
          > -->
        </div>
      </div>
    </div>
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
const data = reactive({
  tabPosition: "left",
  activeName: "0",
  del: false,
  gradeList: {
    Type: "2", //类型
    TypeName: "多选", //类型名称
    Title: "", //问题的名称
    Remind: 1, //评分低时是否推送
    RemindScore: 3, //推送的最低评分
    Item: [
      {
        Star: {
          //评价信息（星）
          Id: 0, //评价信息编号
          Star: 0, //评价信息内容，星的列表
        },
        Options: [
          //评价信息（星）对应的选项
          {
            label: "",
            type: "check",
          },
          {
            label: "",
            type: "check",
          },
        ],
      },
    ],
  },
});
const addGrade = () => {
  props.Entry.Topics.push(data.gradeList);
};
defineExpose({ addGrade });
// 增加选项，通过子元素获取父元素的sid来判断是Item的第几组数组对象数据，
// 然后往当前的数组对象中添加对象
const addOption = (e: any) => {
  let obj = {
    label: "",
    type: "check",
  };
  data.gradeList.Item[0].Options.push(obj);
};
// 删除选项，获取Options里的第几组数据oid
// 根据oid来删除当前的对象
const delOption = (e: any) => {
  let oid = e.currentTarget.parentNode.getAttribute("oid");
  let o = parseInt(oid);
  // console.log("当前点击的：", o);
  for (const j in data.gradeList.Item[0].Options) {
    let oj = parseInt(j);
    if (oj === o) {
      data.gradeList.Item[0].Options.splice(j, 1);
      return data.gradeList.Item[0].Options;
    }
  }
};
const endData = () => {
  // console.log(props.indexQ);
  // console.log(data.gradeList);
  const emit = defineEmits(["questionData"]);
  emit("questionData", data.gradeList);
};
</script>
<style lang="less" scoped>
.select {
  padding: 10px;
  width: 100%;
  // height: 100%;
  border: 0.5px solid #ebeaea;
  background-color: #fafafa;
  .graSelect {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
    .inp {
      width: 100%;
      height: 50px;
      border-bottom: 0.5px solid #ebeaea;
      background-color: #fafafa;
      position: relative;
      .topic {
        width: 200px;
        margin-bottom: 10px;
        position: absolute;
        left: 15px;
      }
    }
    .selectOpt {
      text-align: left;
      margin: 10px;
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>
