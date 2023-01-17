<template>
  <a-modal
    v-model:visible="visible"
    :centered="state.modalCentered"
    :closable="state.modalClosable"
    :destroyOnClose="state.modalDestroyOnClose"
    :confirmLoading="state.modalConfirmLoading"
    :keyboard="state.modalKeyboard"
    :maskClosable="state.modalMaskClosable"
    :width="state.modalWidth"
    :zIndex="state.modalZIndex"
    @ok="handleOk"
    @cancel="handCancel"
    :class="[simpleClass]"
  >
    <!-- 标题 -->
    <template #title>
      <template v-if="!isTitleSlot">
        {{ state.modalTitle }}
      </template>
      <slot name="titleSlot"></slot>
    </template>

    <!-- 底部 -->
    <template #footer>
      <template v-if="!isFooterSlot">
        <a-button @click="handCancel">{{ state.modalCancelText }}</a-button>
        <a-button type="primary" @click="handleOk">{{ state.modalOkText }} </a-button>
      </template>
      <slot name="footerSlot"></slot>
    </template>
    <!-- 内容 -->
    <slot></slot>
  </a-modal>
</template>
<script setup name="BzModalCom">
/**
此公共组件由本人亲自修改
 */
import { ref, reactive, toRefs, onMounted, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
const emits = defineEmits()
const props = defineProps({
  modalProps: {
    required: false,
    default: {}
  }
})
const { t } = useI18n()
const visible = ref(true)
const saveLoading = ref(false)
//弹框初始值
const state = reactive({
  modalTitle: 'Modal', //标题
  modalWidth: '500px', //宽度
  modalOkText: t('base.confirm'), //确定提示语
  modalCancelText: t('base.cancel'), //取消提示语
  modalCentered: false, //垂直居中展示 Modal
  modalClosable: true, //是否显示右上角的按钮
  modalDestroyOnClose: true, //关闭时销毁 Modal 里的子元素
  modalConfirmLoading: false, //确定按钮 loading
  modalKeyboard: false, //是否支持键盘 esc 关闭
  modalMaskClosable: false, //点击蒙层是否允许关闭
  modalZIndex: 1000, //设置 Modal 的 z-index
  isTitleSlot: false, //设置默认头部
  isFooterSlot: false, //设置默认底部
  layout: 'Horizontal' //表单排列方式
})

//modalProps 对象值按照state中配置
onMounted(() => {
  mergeObject(state, props.modalProps)
})

//取消
const handCancel = () => {
  emits('handleCancel')
}

//确定
const handleOk = () => {
  if (saveLoading.value) return
  saveLoading.value = true
  emits('handleOk')
  setTimeout(() => {
    saveLoading.value = false
  }, 1000)
}

//合并对象
const mergeObject = (objectA, objectB) => {
  Object.keys(objectA).forEach((key) => {
    objectA[key] = objectB[key] == undefined ? objectA[key] : objectB[key]
  })
  return objectA
}

//全局封装拖动
const mouseDownX = ref(0)
const mouseDownY = ref(0)
const deltaX = ref(0)
const deltaY = ref(0)
const sumX = ref(0)
const sumY = ref(0)
const header = ref(null) // 标题头部
const contain = ref(null)
const modalContent = ref(null)
const onmousedown = ref(false)
const simpleClass = computed(() => {
  return Math.random().toString(36).substring(2)
})
onMounted(() => {
  nextTick(() => {
    initialEvent(visible.value)
  })
})
const resetNum = () => {
  mouseDownX.value = 0
  mouseDownY.value = 0
  deltaX.value = 0
  deltaY.value = 0
  sumX.value = 0
  sumY.value = 0
}
// 移动事件
const handleMove = (event) => {
  const delta1X = event.pageX - mouseDownX.value
  const delta1Y = event.pageY - mouseDownY.value
  deltaX.value = delta1X
  deltaY.value = delta1Y
  modalContent.value.style.transform = `translate(${delta1X + sumX.value}px, ${
    delta1Y + sumY.value
  }px)`
}
// 弹窗初始化
const initialEvent = (visible) => {
  if (visible) {
    setTimeout(() => {
      window.removeEventListener('mouseup', removeUp, false)
      contain.value = document.getElementsByClassName(simpleClass.value)[0]
      header.value = contain.value.getElementsByClassName('ant-modal-header')[0]
      modalContent.value = contain.value.getElementsByClassName('ant-modal-content')[0]
      modalContent.value.style.left = 0
      modalContent.value.style.transform = 'translate(0px,0px)'
      header.value.style.cursor = 'all-scroll'
      header.value.onmousedown = (e) => {
        onmousedown.value = true
        mouseDownX.value = e.pageX
        mouseDownY.value = e.pageY
        document.body.onselectstart = () => false
        window.addEventListener('mousemove', handleMove, false)
      }
      window.addEventListener('mouseup', removeUp, false)
    }, 0)
  }
}
// 鼠标停止
const removeMove = () => {
  window.removeEventListener('mousemove', handleMove, false)
}
// 鼠标抬起事件
const removeUp = (e) => {
  document.body.onselectstart = () => true
  if (onmousedown.value && !(e?.pageX === mouseDownX.value && e?.pageY === mouseDownY.value)) {
    onmousedown.value = false
    sumX.value = sumX.value + deltaX.value
    sumY.value = sumY.value + deltaY.value
  }
  removeMove()
}
</script>
