<template>
  <Query @searchQuery="searchQuery" />
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" :dictId="dictId" />
    <BzVxeTable ref="vxeTableRef"  id="table_A004" @clickOrder="clickOrder" :isPager="false">
      <template v-slot:rightButton>
        <BzAddCom @confirm="add" />
      </template>
      <template v-slot:tableInfo>
        <vxe-column field="name" :title="$t('setting.字典项名称')" sortable></vxe-column>
        <vxe-column field="code" :title="$t('setting.字典项标识')" sortable></vxe-column>
        <vxe-column field="value" :title="$t('setting.字典项值')" sortable></vxe-column>
        <vxe-column field="sort" :title="$t('setting.排序号')" sortable></vxe-column>
        <vxe-column field="description" :title="$t('setting.描述')" sortable></vxe-column>
        <vxe-column :title="$t('base.操作')" fixed="right">
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
import { setMessageOption } from "@/utils/common";
import { system_dict_item_list, system_dict_item_delete } from "@/pages/apis/dictionary";
import { useRoute } from "vue-router";
const route = useRoute();
const dictId = ref(route.query.id);
const formState = ref({});
const addModalRef = ref();
const vxeTableRef = ref();
const tableDate = reactive({
  orderBy: null,
  order: null,
});
//弹框基本信息
onMounted(() => {});

//将子组件获取到的对象返回
const searchQuery = (formValue) => {
  formState.value = formValue;
  init();
};

//查询表格数据
const init = () => {
  let params: Object = {
    ...formState.value,
    dictId: dictId.value,
  };
  vxeTableRef.value.tableLoading = true;
  system_dict_item_list(params)
    .then((res) => {
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
const onDelete = (row: Object) => {
  system_dict_item_delete({ dictItemId: row.id }).then((res) => {
    setMessageOption("success");
    init();
  });
};

//新增收货
const add = (row: Object, type: string) => {
  addModalRef.value.openModal(row, type);
};

const addSubmit = () => {
  init();
};

const clickOrder = ({ column, prop, order }) => {
  tableDate.orderBy = column.field;
  tableDate.order = column.order;
  init();
};
</script>
