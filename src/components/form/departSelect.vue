<template>
  <!-- 部门 v2.0 -->
  <a-select
    v-model:value="ID_"
    :allowClear="true"
    :placeholder="getPlaceholder(2)"
    show-search
    :disabled="DIS_"
    :filterOption="filterOption"
    @change="changeID()"
    :mode="MODE_"
  >
    <a-select-option
      v-for="item in LIST_"
      :key="item.id"
      :value="item.id"
      :data="item.deptName"
    >
      {{ item.deptName }}
    </a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
// 公共页面不要修改 如果达不到你的要求 找zhangle 让他来改
import { filterOption } from "@/utils/common";
import { getPlaceholder } from "@/config/i18n";
import { ref } from "vue";
import { getDeptList } from "@/pages/apis/dept";
const emits = defineEmits();
const props = defineProps({
  ID: {
    required: true,
  },
  DIS: {
    required: false,
    default: () => {
      return false;
    },
  },
  MODE: {
    required: false,
    default: () => {
      return "combobox";
    },
  },
});
const ID_ = ref<any>(props.ID);
const DIS_ = ref<any>(props.DIS);
const MODE_ = ref<any>(props.MODE);
const LIST_ = ref<any>([]);
const getInit = () => {
  LIST_.value = [];
  getDeptList({})
    .then((res) => {
      LIST_.value = !res.data ? [] : res.data;
    })
    .catch(() => {
      LIST_.value = [];
    });
};

//重置
const reset = () => {
  ID_.value = MODE_.value == "combobox" ? null : [];
  changeID();
};

//重置所有
const resetList = () => {
  reset();
  LIST_.value = [];
};

const changeID = (): void => {
  let obj: Object = {
    value: null,
    label: null,
  };
  if (!!!ID_.value) {
    obj = {
      value: null,
      label: null,
    };
  } else {
    LIST_.value.forEach((item: Object) => {
      if (ID_.value == item.id) {
        (obj.value = item.id), (obj.label = item.deptName);
      }
    });
  }
  emits("changeZ", obj);
};
defineExpose({
  changeID,
  resetList,
  reset,
  getInit,
});
</script>
