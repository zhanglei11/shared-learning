<template>
  <a-button :type="_type" @click="confirm">
    <template #icon>
      <IconCom :type="_iconType" />
    </template>
    {{ $t(_title) }}
  </a-button>
</template>
<script setup name="BzAddCom">
// 公共页面不要修改 如果达不到你的要求 找zhangle 让他来改
import { ref } from "vue";
import IconCom from "./IconCom.vue";
const emits = defineEmits();
const props = defineProps({
  /**
   * row
   * 作为回调值，必输，不然无法判断删除是哪一项
   */
  row: {
    required: true,
    default: {},
  },
  /**
   * button按钮类型
   * 非必输
   * 如：danger
   * 如需换其他按钮类型，本组件支持所以的antdesign按钮类型
   */
  type: {
    //button按钮类型
    required: false,
    default: "primary",
  },
  /**
   * 图标类型
   * 非必输
   * 如：DeleteOutlined
   * 如需换其他图标，本组件支持所以的antdesign图标
   * 在IconCom组件中引入即可，
   */
  iconType: {
    required: false,
    default: "PlusOutlined",
  },
  /**
   * 提示语
   * 非必输
   * 如：删除
   * 如需改变其他，写好在国际化中添加注释即可
   */
  title: {
    //文字描述
    required: false,
    default: "新建",
  },
});
const _type = ref(props.type);
const _iconType = ref(props.iconType);
const _title = ref(`base.${props.title}`);
const confirm = () => emits("confirm", {}, "add");
defineExpose({
  confirm,
});
</script>
