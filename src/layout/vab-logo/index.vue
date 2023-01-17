<template>
  <a-anticoncol class="vab-logo">
    <div :class="collapse ? 'anticon' : 'anticon-s'">
      <span>项目名称</span>
      <!-- <span v-if="locale == 'en'">Smart Audit</span> -->
    </div>
  </a-anticoncol>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { ref } from "vue";
const { t, locale } = useI18n();
const store = useStore();
const collapse = ref(store.state.settings.collapse);
const setCollapse = (value) => (collapse.value = value);
defineExpose({
  setCollapse,
});
</script>
<style lang="less" scoped>
.vab-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid #485460;
  background: rgba(13, 40, 73, 1);
  text-align: center;
}
.anticon {
  width: 60px !important;
  height: 18px !important;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
}
.anticon-s {
  margin: 0 auto;
  width: 180px;
  color: white;
  background: rgba(13, 40, 73, 1);;
  font-size: 26px;
}
</style>
