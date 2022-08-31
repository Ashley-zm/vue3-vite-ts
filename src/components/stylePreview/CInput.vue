<template>
  <el-row>
    <el-col>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-col>

    <el-col class="mt10">
      <el-input type="textarea" placeholder="请输入内容" v-model="textarea1"></el-input>
    </el-col>

    <el-col class="mt10">
      <el-input placeholder="请输入内容" v-model="input1">
        <template #prepend>Http://</template>
      </el-input>
    </el-col>
    <el-col class="mt10">
      <el-input-number v-model="num"
                       :min="1"
                       :max="10"
                       label="描述文字">
      </el-input-number>
      <el-select v-model="selectValue" placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <el-cascader v-model="cascaderValue"
                   :options="cascaderOptions">
      </el-cascader>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CInput",
  data() {
    return {
      textarea1:'',
      input: '',
      input1: '',
      num: 0,
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      selectValue: '',
      cascaderOptions: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
          ],
        },
      ],
      cascaderValue: '',
    }
  }
}
</script>

<style scoped>

</style>
