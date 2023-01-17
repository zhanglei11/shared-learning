<template>
  <a-layout class="vab-layout-wrap" v-if="!isFullscreen">
    <a-layout-sider
      collapsible
      class="vab-sider"
      width="200"
      v-model:collapsed="collapse"
      :trigger="null"
    >
      <VabLogo ref="vabLogRef" />
      <VabMenu ref="vabMenuRef" />
    </a-layout-sider>
    <a-layout :class="collapse ? 'vab-layout-min' : 'vab-layout'">
      <a-layout-header class="vab-header">
        <a-row>
          <a-col :md="16" :sm="24">
            <span class="fl">
              <MenuUnfoldOutlined
                v-if="collapse"
                @click="toggleCollapse"
                class="trigger"
              ></MenuUnfoldOutlined>
              <MenuFoldOutlined
                v-else
                @click="toggleCollapse"
                class="trigger"
              ></MenuFoldOutlined>
            </span>
          </a-col>
          <a-col :md="8" :sm="24">
            <VabAvatar ref="vabAvatarRef" @changeIsFullscreen="changeIsFullscreen" />
          </a-col>
        </a-row>
      </a-layout-header>
      <VabTabs />
      <VabContent />
    </a-layout>
  </a-layout>
  <VabContent v-if="isFullscreen" style="z-index: 2000" />
  <VabAvatar
    style="display: none"
    ref="vabAvatarRef"
    @changeIsFullscreen="changeIsFullscreen"
  />
</template>
<script lang="ts" setup>
import VabLogo from "./vab-logo/index.vue";
import VabAvatar from "./vab-avatar/index.vue";
import VabMenu from "./vab-menu/index.vue";
import VabTabs from "./vab-tabs/index.vue";
import VabContent from "./vab-content/index.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, onMounted, watch, nextTick } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { getCurrentUser, getUserInfo } from "@/pages/apis/user";
import { system_dict_all_map } from "@/pages/apis/dictionary";
const vabLogRef = ref();
const vabAvatarRef = ref();
const vabMenuRef = ref();
const store = useStore();
const collapse = ref<any>(store.state.settings.collapse);
const isFullscreen = ref<boolean>(false);

//切换 collapsed 模式
const toggleCollapse = () => {
  store.dispatch("settings/toggleCollapse");
  collapse.value = store.state.settings.collapse;
  vabLogRef.value.setCollapse(store.state.settings.collapse);
};

//获取基本信息
const getAccount = () => {
  getCurrentUser()
    .then((res) => {
      vabAvatarRef.value.updateData(res.data.loginName);
      store.dispatch("user/toggleUserInfo", res.data);
    })
    .catch((res: any) => {
      store.dispatch("user/toggleUserInfo", {});
    });
  //更新字典信息
  system_dict_all_map()
    .then((res) => {
      store.dispatch("user/toggleDictionaryInfo", res.data);
    })
    .catch(() => {
      store.dispatch("user/toggleDictionaryInfo", {});
    });
};

const changeIsFullscreen = (value: any) => {
  isFullscreen.value = value;
  if (collapse.value != isFullscreen.value) {
    toggleCollapse();
  }
};

onMounted(() => {
  vabMenuRef.value.setMenu();
  getAccount();
});
watch(
  () => isFullscreen.value,
  (val) => {
    if (!val) {
      nextTick(() => {
        vabMenuRef.value.setMenu();
      });
    }
  }
);
</script>
<style lang="less">
.ant-layout-sider {
  background-color: rgba(13, 40, 73, 1);
}
.vab-layout-wrap {
  .vab-sider {
    position: fixed;
    left: 0;
    height: 100vh;
    overflow: auto;
    .ant-menu {
      background: rgba(13, 40, 73, 1);
      color: #fff;
    }
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected,
    .ant-menu-item:active,
    .ant-menu-submenu-title:active {
      background-color: rgba(10, 31, 56);
    }
    .ant-menu-inline {
      width: 199px;
      border-right: none;
    }
  }

  .vab-layout {
    padding-left: 200px;
    transition: all 0.2s;
  }

  .vab-layout-min {
    padding-left: 80px;
    transition: all 0.2s;
  }

  .vab-header {
    padding: 0;
    background: #fff;
    color: #fff;
    background-color: rgba(13, 40, 73, 1);
    .trigger {
      height: 16px;
      line-height: 64px;
      cursor: pointer;
      transition: color 0.3s;
      margin-top: 3px;
      font-size: 16px;
      padding: 0 10px;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
