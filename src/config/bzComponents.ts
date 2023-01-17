import DeleteCom from "@/components/modules/deleteCom.vue";
import EditCom from "@/components/modules/editCom.vue";
import AddCom from "@/components/modules/addCom.vue";
import ModalCom from "@/components/modal/modalCom.vue";
import SelectCom from "@/components/modules/selectCom.vue";
import SureReset from "@/components/form/sureReset.vue";
import SearchQuery from "@/components/form/searchQuery.vue";
import VxeTable from "@/components/table/vxeTable.vue";
import PrintImage from "@/components/print/printImage.vue";
//组件注册
DeleteCom.install = (app: any) => {
  app.component(DeleteCom.name, DeleteCom)
}
EditCom.install = (app: any) => {
  app.component(EditCom.name, EditCom)
}
AddCom.install = (app: any) => {
  app.component(AddCom.name, AddCom)
}
ModalCom.install = (app: any) => {
  app.component(ModalCom.name, ModalCom)
}
SureReset.install = (app: any) => {
  app.component(SureReset.name, SureReset)
}
SearchQuery.install = (app: any) => {
  app.component(SearchQuery.name, SearchQuery)
}
VxeTable.install = (app: any) => {
  app.component(VxeTable.name, VxeTable)
}
SelectCom.install = (app: any) => {
  app.component(SelectCom.name, SelectCom)
}
PrintImage.install = (app: any) => {
  app.component(PrintImage.name, PrintImage)
}
const list = [DeleteCom, EditCom, AddCom, ModalCom, SureReset, SearchQuery, VxeTable, SelectCom, PrintImage]
//遍历使用已注册的组件
const comList: any = (app: any) => {
  list.forEach((component: any) => {
    app.use(component)
  })
}
export default comList
