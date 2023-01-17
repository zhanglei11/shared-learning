<template>
  <Query ref="queryRef" @searchQuery="searchQuery"></Query>
  <a-card :bordered="false">
    <AddModal ref="addModalRef" @addSubmit="addSubmit" />
    <AuthRole ref="authModalRef" @addSubmit="addSubmit" />
    <BzVxeTable ref="vxeTableRef" id="table_A001" @handlePage="handlePage">
      <template v-slot:rightButton>
        <BzAddCom @confirm="add" />
      </template>
      <template v-slot:tableInfo>
        <vxe-column
          field="workNo"
          :title="$t('setting.工号')"
        ></vxe-column>
        <vxe-column
          field="userName"
          :title="$t('setting.用户名称')"
        ></vxe-column>
        <vxe-column
          field="department.deptName"
          :title="$t('setting.部门名称')"
        ></vxe-column>
        <vxe-column field="email" :title="$t('setting.邮箱')">
        </vxe-column>
        <vxe-column field="createTime" :title="$t('setting.创建时间')">
          <template v-slot="{ row }">
            {{ setMoment(row.createTime) }}
          </template>
        </vxe-column>
        <vxe-column :title="$t('base.operation')" fixed="right">
          <template v-slot="{ row }">
            <BzEditCom :row="row" @confirm="add" />
            <a-tooltip placement="topLeft" :title="$t('setting.分配角色')">
              <a-button type="link" @click="authRole(row)" class="mr10">
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
import { reactive, ref, onMounted, onActivated } from "vue";
import Query from "./components/query.vue";
import AddModal from "./components/addModal.vue";
import AuthRole from "@/pages/setting/user/components/authRole.vue";
import IconCom from "@/components/modules/IconCom.vue";
import { setMoment, setMessageOption } from "@/utils/common";
import { deleteUser, getUserList } from "@/pages/apis/user";
const formState = ref<any>({});
const addModalRef = ref<any>();
const authModalRef = ref<any>();

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
  getUserList(params)
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
    deleteUser({ userId: row.id }).then((res: any) => {
      setMessageOption("success");
      vxeTableRef.value.selectPageTable("update");
    });
  }
};

//分页查询
const handlePage = (currentPage, pageSize) => {
  init("update", currentPage, pageSize);
};

//新增用户
const add = (row: any, type: string) => {
  addModalRef.value.openModal(row, type);
};
//分配角色
const authRole = (row: any) => {
  authModalRef.value.openModal(row);
};
const addSubmit = () => {
  vxeTableRef.value.selectPageTable("initial");
};
</script>
