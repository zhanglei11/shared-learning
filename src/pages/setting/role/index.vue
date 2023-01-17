<template>
  <Query ref="queryRef" @searchQuery="searchQuery" />
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <BzVxeTable ref="vxeTableRef" id="table_A002" @handlePage="handlePage">
      <template v-slot:rightButton>
        <BzAddCom @confirm="add" />
      </template>
      <template v-slot:tableInfo>
        <vxe-column
          field="roleName"
          :title="$t('setting.角色名称')"
        ></vxe-column>
        <vxe-column
          field="roleKey"
          :title="$t('setting.权限字符')"
        ></vxe-column>
        <vxe-column field="roleSort" :title="$t('setting.排序')">
        </vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')">
          <template v-slot="{ row }">
            {{ setMoment(row.createTime) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.operation')">
          <template v-slot="{ row }">
            <BzEditCom :row="row" @confirm="add" />
            <BzDeleteCom :row="row" @confirm="onDelete" />
          </template>
        </vxe-column>
      </template>
    </BzVxeTable>
  </a-card>
</template>
<script lang="ts" setup>
import { deleteRole, getRoleList } from "@/pages/apis/role";
import { reactive, ref, onMounted } from "vue";
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import { setMoment, setMessageOption } from "@/utils/common";
const formState = ref<any>({});
const addModalRef = ref<any>();
const tableDate = reactive({
  pageNumber: 1,
  pageSize: 10,
});
//弹框基本信息
onMounted(() => {});

//将子组件获取到的对象返回
const searchQuery = (formValue: any) => {
  formState.value = formValue;
  vxeTableRef.value.selectPageTable("initial");
};
const vxeTableRef = ref();
//查询表格数据
const init = (type: string, pageNumber, pageSize) => {
  let params: Object = {
    ...formState.value,
    pageNumber: pageNumber,
    pageSize: pageSize,
  };
  vxeTableRef.value.tableLoading = true;
  getRoleList(params)
    .then((res: any) => {
      vxeTableRef.value.setTableDate(res);
    })
    .catch((res: any) => {
      vxeTableRef.value.setTableDate([]);
    })
    .finally(() => {
      vxeTableRef.value.tableLoading = false;
    });
};

//删除 内容
const onDelete = (row: any) => {
  if (row.id == "1") {
    setMessageOption("error", "不可删除");
  } else {
    deleteRole({ roleId: row.id }).then((res: any) => {
      setMessageOption("success");
      vxeTableRef.value.selectPageTable("update");
    });
  }
};

//分页查询
const handlePage = (currentPage, pageSize) => {
  init("update", currentPage, pageSize);
};

//新增收货
const add = (row: any, type: string) => {
  addModalRef.value.openModal(row, type);
};

const addSubmit = () => {
  vxeTableRef.value.selectPageTable("initial");
};
</script>
