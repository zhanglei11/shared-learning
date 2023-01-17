<template>
  <BzSearchQuery>
    <a-col :span="6">
      <a-form-item :label="$t('setting.字典项名称')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="formState.name"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
    </a-col>
    <a-col :span="6">
      <a-form-item :label="$t('setting.字典项标识')">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="formState.code"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
    </a-col>
    <BzSureReset @search="search" @reset="reset" />
  </BzSearchQuery>
</template>
<script setup>
import { public_form_empty } from "@/utils/common";
import { reactive, onMounted, onActivated } from "vue";
import { getPlaceholder } from "@/config/i18n";
const emits = defineEmits();
const formState = reactive({
  name: null,
  code: null,
});

onMounted(() => {
  search()
});

//重置
const reset = () => {
  public_form_empty(formState); //清空
};

//搜索
const search = () => emits("searchQuery", formState);

</script>
