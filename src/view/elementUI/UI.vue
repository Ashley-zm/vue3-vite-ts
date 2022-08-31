<template>
  <CTable></CTable>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
const form = ref({});
const CButton = defineAsyncComponent(
  () => import("@/components/stylePreview/CButton.vue")
);
const Clink = defineAsyncComponent(() => import("@/components/stylePreview/Clink.vue"));
const CForm = defineAsyncComponent(() => import("@/components/stylePreview/CForm.vue"));
const CInput = defineAsyncComponent(() => import("@/components/stylePreview/CInput.vue"));
const CRadio = defineAsyncComponent(() => import("@/components/stylePreview/CRadio.vue"));
const CSwitch = defineAsyncComponent(
  () => import("@/components/stylePreview/CSwitch.vue")
);
const CDatePicker = defineAsyncComponent(
  () => import("@/components/stylePreview/CDatePicker.vue")
);
const CTree = defineAsyncComponent(() => import("@/components/stylePreview/CTree.vue"));
const CTransfer = defineAsyncComponent(
  () => import("@/components/stylePreview/CTransfer.vue")
);
const CTable = defineAsyncComponent(() => import("@/components/stylePreview/CTable.vue"));
const CTag = defineAsyncComponent(() => import("@/components/stylePreview/CTag.vue"));
const CAlert = defineAsyncComponent(() => import("@/components/stylePreview/CAlert.vue")),
  constCTimeline = defineAsyncComponent(
    () => import("@/components/stylePreview/CTimeline.vue")
  );
const CNavMenu = defineAsyncComponent(
  () => import("@/components/stylePreview/CNavMenu.vue")
);
const CTabs = defineAsyncComponent(() => import("@/components/stylePreview/CTabs.vue"));
const CDialog = defineAsyncComponent(
    () => import("@/components/stylePreview/CDialog.vue")
  ),
  constCCollapse = defineAsyncComponent(
    () => import("@/components/stylePreview/CCollapse.vue")
  );
const CAvatar = defineAsyncComponent(
  () => import("@/components/stylePreview/CAvatar.vue")
);
</script>

<style lang="less" scoped>
.stylePreviewBox {
  width: 98%;
  padding: 10px;
  .el-form-item__label {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
