<template>
  <BzSearchQuery>
    <a-col :span="6">
      <a-form-item :label="$t('setting.部门')">
        <DepartSelect
          ref="departSelectRef"
          :ID="formState.deptId"
          @changeZ="changeDepart"
        ></DepartSelect>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('setting.用户名称')">
        <a-input
          type="text"
          v-model:value="formState.userName"
          :placeholder="getPlaceholder(1)"
          :allowClear="true"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('setting.手机号')">
        <a-input
          type="text"
          v-model:value="formState.mobile"
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
import { reactive, onMounted, ref, onActivated } from "vue";
import DepartSelect from "@/components/form/departSelect.vue";
const departSelectRef = ref(null);
onMounted(() => {
  departSelectRef.value.getInit();
});

const formState = reactive({
  userName: null,
  mobile: null,
  deptId: null,
});

//重置
const reset = () => {
  public_form_empty(formState); //清空
  departSelectRef.value.reset();
};
const emits = defineEmits();
//搜索
const search = () => emits("searchQuery", formState);

//部门
const changeDepart = ({ value }) => (formState.deptId = value);
onActivated(() => search());
defineExpose({
  search,
  reset,
});
</script>
