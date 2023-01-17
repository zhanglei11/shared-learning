<template>
  <BzModalCom
    v-if="modalFlag"
    :modalProps="modalProps"
    @handleOk="handleOk"
    @handleCancel="handleCancel"
  >
    <a-form
      :model="modalForm"
      :rules="formRules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      ref="formRef"
    >
      <a-form-item :label="$t('setting.角色名称')" name="roleName">
        <a-input
          type="text"
          v-model:value="modalForm.roleName"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.权限字符')" name="roleKey">
        <a-input
          type="text"
          v-model:value="modalForm.roleKey"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.角色顺序')" name="roleSort">
        <a-input-number
          :min="0"
          style="width: 100%"
          v-model:value="modalForm.roleSort"
          :placeholder="getPlaceholder(1)"
        ></a-input-number>
      </a-form-item>
      <!-- <a-form-item label="状态" name="status">
        <a-radio-group v-model:value="modalForm.status">
          <a-radio value="0">正常</a-radio>
          <a-radio value="1">停用</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item :label="$t('setting.权限菜单')">
        <a-radio-group @change="changeData" v-model:value="modalForm.menuType">
          <!-- <a-radio value="1">目录</a-radio> -->
          <a-radio value="2">菜单</a-radio>
          <!-- <a-radio value="3">按钮</a-radio> -->
        </a-radio-group>
      </a-form-item>
      <a-row :gutter="16">
        <a-col :span="6"></a-col>
        <a-col :span="16">
          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
            checkable
            virtual="true"
            :tree-data="state.filterMenuList"
            :field-names="{ title: 'menuName', key: 'id', options: 'children' }"
          >
          </a-tree>
        </a-col>
      </a-row>
      <a-form-item :label="$t('setting.备注')">
        <a-textarea
          v-model:value="modalForm.remark"
          :placeholder="getPlaceholder(1)"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </BzModalCom>
</template>
<script lang="ts" setup>
import {
  public_form_empty,
  public_form_data_replace,
  handleTree,
  setMessageOption,
} from "@/utils/common";
import { getPlaceholder, setModalTitleType, setRules } from "@/config/i18n";
import { reactive, ref, nextTick, onMounted, watch } from "vue";
import { addRole, getRoleInfo, updateRole } from "@/pages/apis/role";
import { getMenuListByRole, getMenuListByUser } from "@/pages/apis/menu";
const formRef = ref<any>();
const modalFlag = ref<boolean>(false);
const modalProps = ref<any>({});
const state = reactive<any>({
  menuList: [],
  filterMenuList: [],
});
const treeFilterData = reactive([
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        disabled: true,
        children: [
          { title: "leaf", key: "0-0-0-0", disableCheckbox: true },
          { title: "leaf", key: "0-0-0-1" },
        ],
      },
      {
        title: "parent 1-1",
        disabled: true,
        key: "0-0-1",
        children: [{ key: "0-0-1-0", title: "sss" }],
      },
    ],
  },
]);
const modalForm = reactive({
  roleName: null,
  roleKey: null,
  roleSort: null,
  status: null,
  remark: null,
  roleId: null,
  menuType: "2",
});
const name_list = ref([
  { value: "1", label: "设备1" },
  { value: "2", label: "设备2" },
  { value: "3", label: "设备3" },
]);
//弹框信息 若编辑 可保留id
const modalInfo: {
  type: string | null;
  id: string | null;
} = reactive({
  type: null,
  id: null,
});
//全县菜单
const changeData = () => {
  public_form_data_replace(
    state.filterMenuList,
    JSON.parse(JSON.stringify(state.menuList))
  );
  state.filterMenuList.filter((item: any) => {
    if (modalForm.menuType == 1 && item.children != null) {
      item.children = [];
    } else if (modalForm.menuType == 2 && item.children != null) {
      item.children.filter((child: any) => {
        child.children = [];
      });
    }
  });
};

const initData = () => {
  getMenuListByUser({})
    .then((res: any) => {
      state.menuList = !res.data ? [] : handleTree(res.data);
      state.filterMenuList = !res.data ? [] : handleTree(res.data);
    })
    .catch((res: any) => {
      state.menuList = [];
      state.filterMenuList = [];
    });
};
onMounted(() => {
  initData();
});
//表单验证
const formRules = reactive({
  roleName: [setRules(2)],
  roleKey: [setRules(2)],
  orderNum: [setRules(2)],
  status: [setRules(2)],
  remark: [setRules(2)],
  menuType: [setRules(2)],
});
//打开弹框
const openModal = (row: any, type: any) => {
  modalInfo.type = type;
  if (type == "add") {
    modalForm.menuType = "2";
    modalForm.status = "0";
  } else {
    public_form_data_replace(modalForm, row);
    modalForm.roleSort = row.roleSort;
    getMenuListByRole({ roleId: row.id }).then((res: any) => {
      checkedKeys.value = res.data;
    });
  }
  modalInfo.id = row.id;
  modalProps.value = {
    modalTitle: setModalTitleType(type),
  };
  modalFlag.value = true;
};

//取消
const handleCancel = () => {
  modalFlag.value = false;
  public_form_empty(modalForm);
  checkedKeys.value = [];
};

//确定
const handleOk = () => {
  formRef.value.validate().then(() => {
    if (modalInfo.type == "add") {
      let params = {
        ...modalForm,
        menuIds: checkedKeys.value,
      };
      addRole(params).then((res: any) => handleMessage(res));
    } else if (modalInfo.type == "edit") {
      let params = {
        ...modalForm,
        menuIds: checkedKeys.value,
        id: modalInfo.id,
      };
      updateRole(params).then((res: any) => handleMessage(res));
    }
  });
};
const emits = defineEmits();
//统一信息处理
const handleMessage = (res: any) => {
  emits("addSubmit");
  setMessageOption('success')
  handleCancel();
};

const expandedKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const checkedKeys = ref<string[]>([]);
watch(expandedKeys, () => {
  console.log("expandedKeys", expandedKeys.value);
});
watch(selectedKeys, () => {
  console.log("selectedKeys", selectedKeys.value);
});
watch(checkedKeys, () => {
  console.log("checkedKeys________");
  console.log("checkedKeys", checkedKeys.value);
});

defineExpose({
  openModal,
});
</script>
