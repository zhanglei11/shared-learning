<template>
  <a-card :bordered="false">
    <a-button type="primary" @click="clickAll">打开</a-button>
  </a-card>
  <DraggableModal v-model:visible="state.visible" @ok="onOk" />
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { DraggableModal } from "@/components/draggable-modal";

const state = reactive({
  visible: false,
});
const onOk = () => {
  state.visible = false;
};
onMounted(() => {});
</script>
