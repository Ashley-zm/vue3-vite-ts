<!--评分+多选 -->
<template>
  <div class="select">
    <!-- <div class="graSelect"> -->
    <div class="inp">
      <el-input
        size="mini"
        v-model="data.gradeList.Title"
        placeholder="请输入题目"
      ></el-input>
    </div>
    <el-tabs class="selectTab" :tab-position="data.tabPosition" type="border-card">
      <el-tab-pane v-for="(item, index) in data.gradeList.Item" :key="index">
        <div class="rate" slot="label" :iId="item.Star.Id">
          <div>
            <el-rate
              show-score
              style="float: left; margin-right: 5px"
              v-model="item.Star.Star"
              text-color="#ff9900"
            >
            </el-rate>
            <p style="line-height: 16px; margin: 1px 0px 0px 0px">星</p>
          </div>
          <el-link
            style="margin: 0px 0px 3px 14px"
            :underline="false"
            v-if="data.gradeList.Item.length > 1"
            @click="delItem($event)"
            >删除</el-link
          >
        </div>
        <div v-for="(i, index) in item.Options" :key="index">
          <div :sid="item.Star.Id" :oid="index" v-if="index === item.Options.length - 1">
            <span>多选{{ index + 1 }}</span>
            <el-input
              size="mini"
              v-model="i.label"
              style="width: 220px; margin-right: 10px"
              placeholder="请输入内容"
            ></el-input>
            <el-link
              v-if="item.Options.length > 2"
              @click="delOption($event)"
              style="font-size: 12px; line-height: 14px"
              >删除</el-link
            >
            <el-link
              v-if="item.Options.length < 6"
              @click="addOption($event)"
              style="font-size: 12px; line-height: 14px"
              >添加</el-link
            >
          </div>
          <div :sid="item.Star.Id" :oid="index" v-else>
            <span>多选{{ index + 1 }}</span>
            <el-input
              size="mini"
              style="width: 220px; margin-right: 10px"
              v-model="i.label"
              placeholder="请输入内容"
            ></el-input>
            <el-link
              v-if="item.Options.length > 2"
              @click="delOption($event)"
              style="font-size: 12px; line-height: 14px"
              >删除</el-link
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="addTab" v-if="data.gradeList.Item.length < 6">
      <el-link
        style="line-height: 14px; margin-left: 10px"
        type="danger"
        @click="addTab()"
        >添加分组</el-link
      >&nbsp;&nbsp;|&nbsp;&nbsp;
      <span style="font-size: 12px">不同星级可设不同选项</span>
    </div>
    <span style="font-size: 13px; padding: 10px; color: #606266"
      >提醒设置：当评分 ≤
      <el-select style="width: 60px" size="mini" v-model="data.gradeList.RemindScore">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" selected="selected" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
      </el-select>
      星，发送给相关负责人
    </span>
    <!-- </div> -->
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
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
    Type: "3", //类型
    TypeName: "评分+多选", //类型名称
    Title: "", //问题的名称
    Remind: 1, //评分低时是否推送
    RemindScore: 3, //推送的最低评分
    Item: [
      {
        Star: {
          //评价信息（星）
          Id: 1, //评价信息编号
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
      // {
      //   Star: {//评价信息（星）
      //     Id: 2,//评价信息编号
      //     Star: 0//评价信息内容，星的列表
      //   },
      //   Options: [//评价信息（星）对应的选项
      //     {
      //       label: "",
      //       type: "check"
      //     },
      //     {
      //       label: "",
      //       type: "check"
      //     },
      //   ]
      // },
    ],
  },
});
const addGrade = () => {
  console.log("现在是第几题：", props.Entry.Topics.length);
  props.Entry.Topics.push(data.gradeList);
  console.log("评分加多选添加后是第几题：", props.Entry.Topics.length);
};
defineExpose({ addGrade });
// 添加分组
const addTab = () => {
  let Item2 = {
    Star: {
      //评价信息（星）
      Id: 2, //评价信息编号
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
  };
  data.gradeList.Item.push(Item2);
};
// 删除分组
const delItem = (event: any) => {
  let iId = event.currentTarget.parentNode.getAttribute("iId");
  let id = parseInt(iId);
  console.log("当前点击：", id);
  if (iId === "2") {
    data.activeName = "0";
  }
  for (const i in data.gradeList.Item) {
    let oi = parseInt(i) + 1;
    // let oi = parseInt(i);
    console.log(oi);
    if (oi === id) {
      data.gradeList.Item.splice(i, 1);
      return data.gradeList.Item;
    }
  }
  console.log(data.gradeList.Item);
};
// 增加选项，通过子元素获取父元素的sid来判断是Item的第几组数组对象数据，
// 然后往当前的数组对象中添加对象
const addOption = (e: any) => {
  let obj = {
    label: "",
    type: "check",
  };
  let sid = e.currentTarget.parentNode.getAttribute("sid");
  let s = parseInt(sid);
  console.log("sid父：", s); //1,2
  for (const i in data.gradeList.Item) {
    if (data.gradeList.Item[i].Star.Id === s) {
      console.log("所在分组id：", data.gradeList.Item[i].Star.Id);
      data.gradeList.Item[i].Options.push(obj);
    }
  }
};
// 删除选项，获取Item中的第几组数据 sid和 Options里的第几组数据oid
// 根据sid和oid来删除当前的对象
const delOption = (e: any) => {
  let sid = e.currentTarget.parentNode.getAttribute("sid");
  let oid = e.currentTarget.parentNode.getAttribute("oid");
  let s = parseInt(sid);
  let o = parseInt(oid);
  // console.log("当前点击的子：", o);
  // console.log("当前点击的父：", s);
  for (const i in data.gradeList.Item) {
    if (data.gradeList.Item[i].Star.Id === s) {
      for (const j in data.gradeList.Item[i].Options) {
        let oj = parseInt(j);
        // console.log("当前循环的子：", oj);
        // let oj = parseInt(j);
        if (oj === o) {
          // console.log("当前匹配的子o 及 oj：", o, oj);
          data.gradeList.Item[i].Options.splice(j, 1);
          return data.gradeList.Item[i].Options;
        }
      }
    }
  }
};
const emit = defineEmits(["questionData"]);
const endData = () => {
  emit("questionData", data.gradeList);
};
watch(
  data.gradeList,
  (newValue, oldValue) => {
    console.log("监听：", newValue, oldValue);
    if (newValue.Item.length > 1) {
      if (newValue.Item[0].Star.Star === newValue.Item[1].Star.Star) {
        console.log(newValue.Item[0].Star.Star);
        console.log(newValue.Item[1].Star.Star);
        newValue.Item[1].Star.Star = 0;
        // alertWarning("评分不能一样！");
      }
    }
  },
  // 深度监听，代表递归监听gradeList的变化
  { deep: true }
);
</script>

<style lang="less" scoped>
.select {
  padding: 10px;
  border: 0.5px solid #ebeaea;
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  position: relative;
  .inp {
    text-align: left;
    .el-input {
      width: 200px;
    }
  }
  .selectTab {
    background-color: #fff;
    .rate {
      width: 100px;
      padding-top: 10px;
      margin-right: 10px;
    }
  }
  .addTab {
  }

  // padding: 10px;
  // width: 100%;
  // height: 100%;
  // border: 0.5px solid #ebeaea;
  // background-color: #fafafa;
}
// .graSelect {
//   width: 100%;
//   height: 100%;
//   background-color: #fff;
//   position: relative;
// }
// .inp {
//   width: 100%;
//   height: 50px;
//   border-bottom: 0.5px solid #ebeaea;
//   background-color: #fafafa;
// }
// .tip {
//   background-color: #fafafa;
//   border: 1px solid #f0f0f0;
//   height: 54px;
//   padding-left: 10px;
//   margin-top: 5px;
// }
// .checkbox-inline {
//   display: inline-block;
//   height: 100%;
//   padding-top: 10px;
// }
</style>
