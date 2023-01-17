<template>
  <Query ref="queryRef" @searchQuery="searchQuery" />
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <BzVxeTable ref="vxeTableRef" :topHeight="310" id="table_A003" :isPager="false">
      <template v-slot:rightButton>
        <BzAddCom @confirm="add" />
      </template>
      <template v-slot:tableInfo>
        <vxe-column
          type="menuId"
          tree-node
          field="menuName"
          :title="$t('setting.菜单名称')"
        ></vxe-column>
        <vxe-column field="menuType" :title="$t('setting.菜单类型')">
          <template v-slot="{ row }">
            {{ menuTypeFilter(row.menuType) }}
          </template>
        </vxe-column>
        <vxe-column field="url" :title="$t('setting.路径')"></vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')">
          <template v-slot="{ row }">
            {{ setMoment(row.createTime) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.operation')" fixed="right">
          <template v-slot="{ row }">
            <BzEditCom :row="row" @confirm="add" />
            <a-tooltip
              v-if="row.menuType == 'M'"
              placement="topLeft"
              :title="$t('setting.添加子菜单')"
            >
              <a-button type="link" @click="add(row, 'addSub')" class="mr10">
                <template #icon>
                  <IconCom type="PlusOutlined" />
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
import { deleteMenu, getMenuListByUser } from "@/pages/apis/menu";
import { reactive, ref, onMounted } from "vue";
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import IconCom from "@/components/modules/IconCom.vue";
import { setMoment, setMessageOption } from "@/utils/common";
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
  getMenuListByUser(params)
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
  let params = {
    id: row.id,
  };
  deleteMenu(params).then((res: any) => {
    setMessageOption("success");
    init();
  });
};

const menuTypeFilter = (val: any) => {
  let result;
  switch (val) {
    case "M":
      result = "目录";
      break;
    case "C":
      result = "菜单";
      break;
    case "F":
      result = "按钮";
      break;
  }
  return result;
};

//添加菜单
const add = (row: any, type: string) => {
  addModalRef.value.openModal(row, type);
};
const addSubMenu = (row: any, type: string) => {
  addModalRef.value.openModal(row, type);
};

const addSubmit = () => {
  init();
};
</script>
