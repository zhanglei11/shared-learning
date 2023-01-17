<template>
  <vxe-toolbar ref="xToolbarRole" custom>
    <template #buttons>
      <slot name="leftButton"></slot>
    </template>
    <template #tools>
      <slot name="rightButton"></slot>
    </template>
  </vxe-toolbar>
  <a-col :style="height">
    <vxe-table
      round
      :id="tableId"
      show-header-overflow
      show-overflow
      border
      ref="xTableRole"
      width="100%"
      auto-resize
      height="auto"
      :data="tableList"
      :loading="tableLoading"
      align="center"
      :column-config="{ resizable: resizableTable }"
      :custom-config="tableCustom"
      :sort-config="{ trigger: 'cell', orders: ['desc', 'asc', null] }"
      :tree-config="{ transform: treeConfigTransform, rowField: 'id', parentField: 'parentId' }"
      @sort-change="clickOrder"
    >
      <slot name="tableInfo"></slot>
    </vxe-table>
  </a-col>
  <vxe-pager
    v-if="isPager"
    perfect
    :current-page="pageNumber"
    :page-size="pageSize"
    :total="totalSize"
    :page-sizes="pageSizesList"
    @page-change="handlePageTable"
    :layouts="layouts"
  ></vxe-pager>
</template>
<script lang="ts" setup name="BzVxeTable">
// 公共页面不要修改 如果达不到你的要求 找zhanglei 让他来改
import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table'
import { reactive, ref, onMounted, computed } from 'vue'
import { layouts, pageSizesList } from '@/config'
import IconCom from '@/components/modules/IconCom.vue'
const xToolbarRole = ref({} as VxeToolbarInstance)
const xTableRole = ref({} as VxeTableInstance)
const emits = defineEmits()
const props = defineProps({
  id: {
    required: false,
    default: () => {
      return 'roleTable'
    }
  },
  topHeight: {
    required: false,
    default: () => {
      return 360
    }
  },
  isPager: {
    required: false,
    default: () => {
      return true
    }
  },
  treeConfigTransform: {
    required: false,
    default: () => {
      return false
    }
  },
  resizableTable: {
    required: false,
    default: () => {
      return true
    }
  }
})
const tableList = ref([]) //数据
const tableLoading = ref(false)
const tableId = ref(props.id)
const topHeight = ref(props.topHeight)
//绑定vxe-table
const changevisible = () => {
  const $table = xTableRole.value
  const $toolbar = xToolbarRole.value
  $table.connect($toolbar)
}
const tableCustom = ref({
  storage: true,
  checkMethod({ column }) {
    return true
  }
})

//设置table高度
const height = computed(() => {
  return {
    height: `calc(100vh - ${topHeight.value}px)`
  }
})

onMounted(() => {
  changevisible()
})

//排序
const clickOrder = ({ column, prop, order }) => {
  emits('clickOrder', { column, prop, order })
}

const totalSize = ref(0) //总数
const pageNumber = ref(1) //当前页
const pageSize = ref(10) //每页数

//处理数据
const setTableDate = (res) => {
  if (props.isPager) {
    tableList.value = res.data?.items ?? []
    pageNumber.value = res.data?.pageNumber ?? 1
    pageSize.value = res.data?.pageSize ?? 10
    totalSize.value = res.data?.totalSize ?? 0
  } else {
    tableList.value = res.data ?? []
  }
}

//分页查询
const handlePageTable = ({ currentPage, pageSize }) => {
  emits('handlePage', currentPage, pageSize)
}

//分页查询
const selectPageTable = (type) => {
  if (type == 'initial') pageNumber.value = 1
  emits('handlePage', pageNumber.value, pageSize.value)
}

defineExpose({
  tableLoading,
  setTableDate,
  selectPageTable
})
</script>
