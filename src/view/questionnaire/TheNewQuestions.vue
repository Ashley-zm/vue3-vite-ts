<template>
  <!-- 创建问卷 -->
  <div
    v-loading="data.daijinloading"
    element-loading-text="创建中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="title">
      <h1>创建问卷</h1>
    </div>
    <div class="daijininfo">
      <el-form
        :model="data.Entry"
        :rules="data.rules"
        ref="Entry"
        label-width="180px"
        class="formData"
      >
        <el-form-item label="问卷名称" prop="Subject" label-width="100px">
          <el-input
            v-model="data.Entry.Subject"
            placeholder="例如：满意度调查"
            size="mini"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <!-- num为0时，没有题目 -->
        <el-form-item v-if="data.num == 0" label="题目" required label-width="100px">
          <el-button type="primary" @click="addQuestion" :icon="Plus" round />
        </el-form-item>
        <div v-else>
          <ul>
            <!-- for start
              for循环Entry.Topics，根据题的类型item.Type对应循环添加 -->
            <li ref="li" v-for="(item, index) in data.Entry.Topics" :key="index">
              <el-form-item
                :label="`第${index + 1}题：评分`"
                v-if="item['Type'] === '1'"
                required
                label-width="80px"
              >
                <GradeType
                  ref="questions"
                  :indexQ="index"
                  @questionData="addData(index, $event)"
                />
                <div class="rate_del" :qid="index" @click="delQuestion($event)">
                  <el-button type="danger" :icon="Delete" circle />
                </div>
              </el-form-item>

              <el-form-item
                :label="`第${index + 1}题：多选`"
                v-if="item['Type'] === '2'"
                required
                label-width="80px"
              >
                <ChoicesType
                  ref="questions"
                  :indexQ="index"
                  @questionData="addData(index, $event)"
                />
                <div class="rate_del" :qid="index" @click="delQuestion($event)">
                  <el-button type="danger" :icon="Delete" circle />
                </div>
              </el-form-item>

              <el-form-item
                :label="`第${index + 1}题：评分+多选`"
                v-if="item['Type'] === '3'"
                required
                label-width="80px"
              >
                <GradeSelectType
                  ref="questions"
                  :indexQ="index"
                  @questionData="addData(index, $event)"
                />
                <div class="rate_del" @click="delQuestion($event)">
                  <el-button type="danger" :icon="Delete" circle />
                </div>
              </el-form-item>
              <el-form-item
                :label="`第${index + 1}题：填空`"
                v-else-if="item['Type'] === '4'"
                required
                label-width="80px"
              >
                <FillType
                  ref="questions"
                  :indexQ="index"
                  @questionData="addData(index, $event)"
                />
                <div class="rate_del" @click="delQuestion($event)">
                  <el-button type="danger" :icon="Delete" circle />
                </div>
              </el-form-item>
            </li>
            <!-- for end -->
          </ul>
          <el-button
            style="width: 80%; margin-bottom: 20px; margin-left: 10%"
            type="primary"
            @click="addQuestion"
            icon="el-icon-plus"
            >题目</el-button
          >
        </div>
      </el-form>
    </div>
    <div class="btn" style="width: 70%; text-align: center; line-height: 70px">
      <el-button type="primary" size="mini" @click="saveCoupon">保存</el-button>
      <el-button type="danger" size="mini">取消</el-button>
    </div>
    <TheQuestionsDialog ref="newquestion" :Entry="data.Entry"></TheQuestionsDialog>
  </div>
</template>
<script setup lang="ts">
import { Delete, Plus } from "@element-plus/icons-vue";
import { reactive, ref, nextTick, watch } from "vue";
//题目选择组件
import TheQuestionsDialog from "@/components/questionType/TheQuestionsDialog.vue";
import GradeSelectType from "@/components/questionType/GradeSelectType.vue";
import ChoicesType from "@/components/questionType/ChoicesType.vue";
import FillType from "@/components/questionType/FillType.vue";
import GradeType from "@/components/questionType/GradeType.vue";

const data = reactive({
  daijinloading: false,
  questionId: 0,
  num: 0, //0(无)、1(有)来显示不同的节点
  Entry: {
    Subject: "", //问卷名称
    // TemplateUrl: "https://manage.welcrm.com/manage2017/questionnaire/downloadProducts",
    Ramark: "测试",
    Topics: [
      //问题列表
      // {
      // Type: "1",//类型
      // TypeName: "评分",//类型名称
      // Title: "您觉得餐厅就餐环境怎么样？",//问题的名称
      // Remind: 1,//评分低时是否推送
      // RemindScore: 3,//推送的最低评分
      // Item: [//评价项目信息（星+评价选项）
      //   {
      //     Star: {//评价信息（星）
      //       Id: null,//评价信息编号
      //       Star: [1, 2, 3, 4, 5]//评价信息内容，星的列表
      //     },
      //     Options: [//评价信息（星）对应的选项
      //       {
      //         label: "非常好适合带家人朋友",
      //         type: "check"
      //       },
      //       {
      //         label: "挺好的适合请客吃饭",
      //         type: "check"
      //       },
      //     ]
      //   }
      // ]
      // },
    ],
  },
  rules: {
    Subject: [{ required: true, message: "请输入问卷名称", trigger: "blur" }],
  },
});
// 弹出选择题目类型
const newquestion = ref();
const addQuestion = () => {
  newquestion.value.isShow();
};
const delQuestion = (e: any) => {
  // 获取当前节点中的动态qid的值,也就是当前的索引值+1=题目序号
  console.log(e.currentTarget.getAttribute("qid"));
  let currentQ = e.currentTarget.getAttribute("qid");
  // 删除当前的问题
  data.Entry.Topics.splice(currentQ, 1);
  console.log(data.Entry.Topics);
};
// 向Entry里添加数据
const addData = (index: any, obj: []) => {
  data.Entry.Topics.splice(index, 1, obj); //更新数据
  data.questionId = index + 1;
};
// 提交数据，创建评论
const questions = ref();
const saveCoupon = () => {
  // 因为ref是跟v-for进行使用的，这就使得ref="name"中的name是一个数组。
  // 所以每一次需要根据题号进行遍历并调用对应子组件里面的方法
  nextTick(() => {
    console.log(questions);
    for (const list in questions) {
      // console.log(questions.value[list]);
      // questions.value[list].endData();
    }
  });
};
const req = () => {
  // this.$refs[Entry].validate((valid) => {
  //   if (valid) {
  //     alert("submit!");
  //   } else {
  //     console.log("error submit!!");
  //     return false;
  //   }
  // });
  console.log("提交数据~~~~~~~~~~~~");
  console.log(data.Entry);
  console.log("~~~~~~~~~~~~");
  data.daijinloading = true;
  let prams = {
    Entry: data.Entry,
    comm: {
      AccessToken:
        "A532CB6E6C2D010379A68D0D5B998A4BF4639CD6E48F76A354E90AB25CC5E9E3BB69E8C5E1BE7D2CE65DD78D6ADE183C34060A52D52D9952279B4FD607D11B1FC5185F95031AF6F03B31B92E3FA827298C32E2DF272A31901CE63E68114192F9CB631341F1ED79DBBF172776C740C253C972430948C4A05B86837032FB2A3DAE77CF81E653334C2DAB72AF78D89330668DFE884269C49AC5182404767697A0C4EFDDC405B4982D8091639EECA18EF3AF81812B17435BD9D30552BBD032D3A51FD7C9DAD9431A02D33B12B40B3855FF8FEADC63EC0DD753FD7F6E76A6E37AA134",
    },
  };
  // // 发送请求
  // reqCreateComment(data)
  //   .then(res => {
  //     this.daijinloading = false;
  //     if (res.data.code == 1) {
  //       alertSuccess(res.data.msg);
  //       this.$router.push("/commentManagement");
  //     } else {
  //       alertWarning(res.data.msg);
  //     }
  //   })
  //   .catch(err => { alertWarning(err); });
};
watch(
  data.Entry.Topics,
  (newValue, oldValue) => {
    if (newValue.length > 0) {
      data.num = 1;
      if (data.questionId === newValue.length) {
        console.log("data.questionId::::::", data.questionId);
        // data.req();
      }
    } else {
      data.num = 0;
    }
  },
  { deep: true }
);
</script>
<style lang="less" scoped>
.daijininfo {
  /* height: 62vh; */
  margin-top: 30px;
  overflow-y: scroll;
  .formData {
    width: 80%;
    background: #fff;
  }
}
.rate_del {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
