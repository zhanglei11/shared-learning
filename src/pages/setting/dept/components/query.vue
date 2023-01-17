<template>
  <BzSearchQuery>
    <a-col :span="6">
      <a-form-item :label="$t('setting.部门名称')">
        <a-input
          type="text"
          v-model:value="formState.deptName"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <BzSureReset @search="search" @reset="reset" />
  </BzSearchQuery>
</template>
<script setup>
import { public_form_empty } from "@/utils/common";
import { getPlaceholder } from "@/config/i18n";
import { reactive, ref, onActivated } from "vue";
const formState = reactive({
  deptName: null,
});
//重置
const reset = () => public_form_empty(formState);
const emits = defineEmits();
//搜索
const search = () => emits("searchQuery", formState);
onActivated(() => search());
defineExpose({
  reset,
  search
})
</script>
