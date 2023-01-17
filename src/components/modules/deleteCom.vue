<template>
  <a-tooltip placement="topLeft" :title="$t(_title)">
    <a-popconfirm
      :title="$t(_titleTip)"
      :ok-text="$t('base.yes')"
      :cancel-text="$t('base.no')"
      @confirm="confirm()"
    >
      <a-button :type="_type" danger>
        <template #icon>
          <IconCom :type="_iconType" />
        </template>
      </a-button>
    </a-popconfirm>
  </a-tooltip>
</template>
<script setup name="BzDeleteCom">
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
    default: "link",
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
    default: "DeleteOutlined",
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
    default: "删除",
  },
  /**
   * 提示语
   * 非必输
   * 如：确定要删除？
   * 如需改变其他，写好在国际化中添加注释即可
   */
  titleTip: {
    required: false,
    default: "sureDelete",
  },
});
const _type = ref(props.type);
const _iconType = ref(props.iconType);
const _title = ref(`base.${props.title}`);
const _titleTip = ref(`base.${props.titleTip}`);
const confirm = () => emits("confirm", props.row);
defineExpose({
  confirm,
});
</script>
