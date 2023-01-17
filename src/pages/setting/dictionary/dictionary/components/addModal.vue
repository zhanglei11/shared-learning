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
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 14 }"
      ref="formRef"
    >
      <a-form-item :label="$t('setting.字典名称')" name="name">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.name"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.字典Code')" name="code">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.code"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.说明')">
        <a-textarea
          :allowClear="true"
          v-model:value="modalForm.description"
          :rows="4"
          :placeholder="getPlaceholder(1)"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </BzModalCom>
</template>
<script lang="ts" setup>
import {
  public_form_empty,
  public_form_data_replace,
  setMessageOption,
} from "@/utils/common";
import { setModalTitleType,getPlaceholder,setRules } from "@/config/i18n";
import {
  reactive,
  ref,
  nextTick,
  onMounted,
} from "vue";
import { system_dict_add, system_dict_update } from "@/pages/apis/dictionary";
const emits = defineEmits();
const formRef = ref();
const modalFlag = ref<boolean>(false);
const modalProps = ref<Object>({});
const modalForm = reactive({
  name: null,
  code: null,
  description: null,
  system: '1',
});

//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: 'add',
  id: null,
});

onMounted(() => {});
//表单验证
const formRules = reactive({
  name: [setRules(1)],
  code: [setRules(1)],
});
//打开弹框
const openModal = (row, type) => {
  if (type == "add") public_form_empty(modalForm,['system']);
  if (type == "edit") public_form_data_replace(modalForm, row);
  modalInfo.type = type;
  modalInfo.id = row.id;
  modalProps.value = {
    modalTitle: setModalTitleType(type)
  };
  modalFlag.value = true;
};

//取消
const handleCancel = () => {
  modalFlag.value = false;
};

//确定
const handleOk = () => {
  formRef.value.validate().then(() => {
    if (modalInfo.type == "add") addSave();
    if (modalInfo.type == "edit") editSave();
  });
};

//新增
const addSave = () => {
  system_dict_add({ ...modalForm }).then((res) => handleMessage(res));
};

//编辑
const editSave = () => {
  system_dict_update({
    ...modalForm,
    id: modalInfo.id,
  }).then((res) => handleMessage(res));
};

//统一信息处理
const handleMessage = (res) => {
  emits("addSubmit");
  setMessageOption('success')
  handleCancel();
};

defineExpose({
  openModal
})

</script>
