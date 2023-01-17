<template>
  <Query @searchQuery="searchQuery" />
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <BzVxeTable ref="vxeTableRef"  id="table_A005" @clickOrder="clickOrder" @handlePage="handlePage">
      <template v-slot:rightButton>
        <BzAddCom @confirm="add" />
      </template>
      <template v-slot:tableInfo>
        <vxe-column field="name" :title="$t('setting.字典名称')" sortable></vxe-column>
        <vxe-column field="code" :title="$t('setting.字典Code')" sortable></vxe-column>
        <vxe-column field="description" :title="$t('setting.说明')" sortable></vxe-column>
        <vxe-column :title="$t('base.操作')" fixed="right">
          <template v-slot="{ row }">
            <BzEditCom :row="row" @confirm="add" />
            <a-tooltip placement="topLeft" :title="$t('setting.查看字典项')">
              <a-button type="link" danger @click="dictionaryInfo(row)" class="mr10">
                <template #icon>
                  <IconCom type="ContactsOutlined" />
                </template>
              </a-button>
            </a-tooltip>
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
import IconCom from "@/components/modules/IconCom.vue";
import { setMessageOption } from "@/utils/common";
import { system_dict_page, system_dict_delete } from "@/pages/apis/dictionary";
import { useRouter } from "vue-router";
const formState = ref({});
const addModalRef = ref();
const vxeTableRef = ref();
const tableDate = reactive({
  // pageNumber: 1,
  // pageSize: 20,
  orderBy: null,
  order: null,
});
//弹框基本信息
onMounted(() => {});

//将子组件获取到的对象返回
const searchQuery = (formValue) => {
  formState.value = formValue;
  // init("initial");
  vxeTableRef.value.selectPageTable("initial");
};

//查询表格数据
const init = (type: string, pageNumber, pageSize) => {
  let params: Object = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    ...formState.value,
    ...tableDate,
  };
  vxeTableRef.value.tableLoading = true;
  system_dict_page(params)
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
  system_dict_delete({ dictId: row.id }).then((res) => {
    setMessageOption("success");
    vxeTableRef.value.selectPageTable("initial");
  });
};

//分页查询
const handlePage = (currentPage, pageSize) => {
  init("update", currentPage, pageSize);
};

//新增收货
const add = (row: Object, type: string) => {
  addModalRef.value.openModal(row, type);
};

const addSubmit = () => {
  // init("initial");
  vxeTableRef.value.selectPageTable("initial");
};

//跳转
const router = useRouter();
const dictionaryInfo = (row) => {
  router.push({
    path: "/setting/dictionary/Item",
    query: {
      id: row.id,
    },
  });
};

const clickOrder = ({ column, prop, order }) => {
  tableDate.orderBy = column.field;
  tableDate.order = column.order;
  init("initial");
};
</script>
