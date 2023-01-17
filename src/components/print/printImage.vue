<template>
  <teleport to="body">
    <PrintCom ref="printRef" tableShow style="display: none">
      <img :src="imgSrc" style="width:99%" />
    </PrintCom>
  </teleport>
  <a-button
    v-if="ptintButtonShow"
    :type="ptintType"
    :size="ptintSize"
    :class="ptintClass"
    :style="ptintStyle"
    :loading="ptintLoading"
    :danger="ptintDanger"
    :disabled="ptintDisabled"
    :ghost="ptintGhost"
    :shape="ptintShape"
    @click="stopUpDownFun(() => clickPrint())"
  >
    <IconCom :type="ptintIcon" />
    {{ ptintTitle }}
  </a-button>
</template>
<script setup name="BzPrintImage">
/**
 * 关于打印标签的统一设置，这里将严格封装了一层
 */
import { ref, onMounted, nextTick } from "vue";
import html2canvas from "html2canvas";
import IconCom from "@/components/modules/IconCom.vue";
import PrintCom from "./printCom.vue";
import mixin from "@/mixin/qrCodePrint.ts";
const { handleSubmit, handlePreview } = mixin.setup();
//引入节流函数
import { stopUpDownFunList } from "@/utils/common";
const stopUpDownFun = stopUpDownFunList();
const emits = defineEmits();
const props = defineProps({
  //值，可以是子字符串也可以是div
  ptintValue: {
    required: false,
    default: "",
  },
  //标题
  ptintTitle: {
    required: false,
    default: () => {
      return "打印";
    },
  },
  /**
   * 设置按钮类型 	primary | ghost | dashed | link | text | default
   */
  ptintType: {
    required: false,
    default: "primary",
  },
  /**
   * browser浏览器  tagsPreview 预览 tagsDirect 直接
   */
  ptintMold: {
    required: false,
    default: "browser",
  },
  /**
   * 	设置按钮大小  large | middle | small
   */
  ptintSize: {
    required: false,
    default: "middle",
  },
  /**
   * 	设置按钮载入状态  boolean | { delay: number }	false
   */
  ptintLoading: {
    required: false,
    default: false,
  },
  /**
   * 	设置危险按钮  boolean false
   */
  ptintDanger: {
    required: false,
    default: false,
  },
  /**
   * 按钮失效状态 boolean false
   */
  ptintDisabled: {
    required: false,
    default: false,
  },
  /**
   * 幽灵属性，使按钮背景透明  boolean false
   */
  ptintGhost: {
    required: false,
    default: false,
  },
  /**
   * 设置按钮形状  default | circle | round
   */
  ptintShape: {
    required: false,
    default: "default",
  },
  /**
   * class
   */
  ptintClass: {
    required: false,
    default: "",
  },
  /**
   * style
   * display:none
   * or
   * {display:"none"}
   */
  ptintStyle: {
    required: false,
    default: "",
  },
  /**
   * icon
   */
  ptintIcon: {
    required: false,
    default: "",
  },
  /**
   * Button按钮是否显示 boolean
   */
  ptintButtonShow: {
    required: false,
    default: true,
  },
  /**
   * awaitTime
   */
  ptintAwaitTime: {
    required: false,
    default: 20,
  },
});
const printRef = ref();
const imgSrc = ref();
const ptintLoading = ref(props.ptintLoading);
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const ptintTitle = ref(t(`base.${props.ptintTitle}`));
//打印html
const clickImage = (ptintValue) => {
  html2canvas(ptintValue)
    .then((canvas) => {
      let dataURL = canvas.toDataURL("image/png", 1);
      imgSrc.value = dataURL;
      nextTick(() => {
        printRef.value.print();
      });
    })
    .catch((e) => {
      console.log("不知道为什么生成错误了");
    })
    .finally(() => {
      console.log("已完成");
    });
};
//打印事件的触发
const clickPrint = () => {
  ptintLoading.value = true;
  switch (props.ptintMold) {
    case "browser":
      clickImage(props.ptintValue);
      break;
    case "tagsDirect":
      handleSubmit(props.ptintValue);
      break;
    case "tagsPreview":
      handlePreview(props.ptintValue);
      break;
    default:
      break;
  }
  ptintLoading.value = false;
  emits("callBack", {});
};

//批量打印 只支持标签打印机直接打印
const printBatch = (list) => {
  list.forEach(async (item) => {
    handleSubmit(item);
  });
};

defineExpose({
  clickPrint,
  printBatch,
});

onMounted(() => {});
</script>
