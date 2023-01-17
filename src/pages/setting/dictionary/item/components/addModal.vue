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
      <a-form-item :label="$t('setting.字典项名称')" name="name">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.name"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.字典项标识')" name="code">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.code"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
      <a-form-item :label="$t('setting.字典项值')" name="value">
        <a-input
          type="text"
          :allowClear="true"
          v-model:value="modalForm.value"
          :placeholder="getPlaceholder(1)"
        ></a-input>
      </a-form-item>
       <a-form-item :label="$t('setting.排序号')" name="sort">
        <a-input-number
          :allowClear="true"
          v-model:value="modalForm.sort"
          min="0"
          :placeholder="getPlaceholder(1)"
        ></a-input-number>
      </a-form-item>
      <a-form-item :label="$t('setting.描述')">
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
import { reactive, ref, nextTick, onMounted } from "vue";
import { system_dict_item_add, system_dict_item_update } from "@/pages/apis/dictionary";
const emits = defineEmits();
const props = defineProps({
  dictId: {
    required: true,
  },
})
const formRef = ref();
const modalFlag = ref(false);
const modalProps = ref({});
const modalForm = reactive({
  name: null,
  code: null,
  value: null,
  sort: null,
  description: null,
});

//弹框信息 若编辑 可保留id
const modalInfo = reactive({
  type: "add",
  dictId: props.dictId,
  id: null,
});

onMounted(() => {});
//表单验证
const formRules = reactive({
  name: [setRules(1)],
  code: [setRules(1)],
  value: [setRules(1)],
  sort: [setRules(1)],
});
//打开弹框
const openModal = (row, type) => {
  if (type == "add") public_form_empty(modalForm);
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
  system_dict_item_add({ dictId: modalInfo.dictId, ...modalForm }).then((res) =>
    handleMessage(res)
  );
};
//编辑
const editSave = () => {
  system_dict_item_update({
    ...modalForm,
    id: modalInfo.id,
    dictId: modalInfo.dictId,
  }).then((res) => handleMessage(res));
};

//统一信息处理
const handleMessage = (res) => {
  emits("addSubmit");
  setMessageOption('success')
  handleCancel();
};

defineExpose({
  openModal,
});
</script>
