<template>
  <Query ref="queryRef" @searchQuery="searchQuery" />
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <BzVxeTable ref="vxeTableRef" id="table_A006" :topHeight="310" :isPager="false">
      <template v-slot:rightButton>
        <BzAddCom @confirm="add" />
      </template>
      <template v-slot:tableInfo>
        <vxe-column
          type="deptId"
          tree-node
          field="deptName"
          :title="$t('setting.部门名称')"
        ></vxe-column>
        <vxe-column field="orderNum" :title="$t('setting.排序')"></vxe-column>
        <vxe-column field="leader" :title="$t('setting.负责人')"></vxe-column>
        <vxe-column field="mobile" :title="$t('setting.手机号')"></vxe-column>
        <vxe-column field="email" :title="$t('setting.邮箱')"></vxe-column>
        <vxe-column field="remark" :title="$t('setting.备注')"></vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')">
          <template v-slot="{ row }">
            {{ setMoment(row.createTime) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.operation')" fixed="right">
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
import { reactive, ref, onMounted } from "vue";
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import { setMoment } from "@/utils/common";
import { deleteDept, getDeptList } from "@/pages/apis/dept";
const formState = ref<any>({});
const addModalRef = ref<any>();
//弹框基本信息
onMounted(() => {});

//将子组件获取到的对象返回
const searchQuery = (formValue: any) => {
  formState.value = formValue;
  init();
};

const vxeTableRef = ref();
//查询表格数据
const init = () => {
  let params: Object = {
    ...formState.value,
  };
  vxeTableRef.value.tableLoading = true;
  getDeptList(params)
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

//删除
const onDelete = (row: any) => {
  deleteDept({ id: row.id })
    .then((res: any) => {
      init();
    })

};

//新增收货
const add = (row: any, type: string) => {
  addModalRef.value.openModal(row, type);
};

const addSubmit = () => {
  init();
};
</script>
