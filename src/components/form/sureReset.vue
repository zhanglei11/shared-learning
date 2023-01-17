<template>
  <a-col>
    <a-button type="primary" @click="search" class="ml10">
      <IconCom type="SearchOutlined" />{{ $t("base.查询") }}
    </a-button>
    <a-button type="default" @click="reset" class="ml10">
      <IconCom type="UndoOutlined" />{{ $t("base.重置") }}
    </a-button>
    <slot name="export"> </slot>
  </a-col>
</template>
<script setup name="BzSureReset">
// 公共页面不要修改 如果达不到你的要求 找zhanglei 让他来改
import IconCom from "@/components/modules/IconCom.vue";
import { stopUpDownFunList } from "@/utils/common";
const stopUpDownFun = stopUpDownFunList();
const emits = defineEmits();
const search = () => stopUpDownFun(() => emits("search"));
const reset = () => stopUpDownFun(() => emits("reset"));
</script>
