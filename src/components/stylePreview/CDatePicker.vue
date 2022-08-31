<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-time-picker v-model="timePickerValue1" placeholder="任意时间点"></el-time-picker>
    </el-col>
    <el-col :span="12">
      <el-time-select v-model="timeSelectValue"
                      start="08:30"
                      step="00:15"
                      end="18:30"
                      placeholder="选择时间">
      </el-time-select>
    </el-col>
    <el-col :span="12">
      <el-date-picker v-model="datePickerValue1" type="date" placeholder="选择日期"></el-date-picker>
    </el-col>
    <el-col :span="12">
      <el-date-picker v-model="datetimePicker" type="datetime" placeholder="选择日期时间">
      </el-date-picker>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CDatePicker",
  data() {
    return {
      timePickerValue1: new Date(2016, 9, 10, 18, 40),
      timeSelectValue: '',
      datePickerValue1: '',
      datetimePicker: ''
    }
  }
}
</script>

<style scoped>

</style>
