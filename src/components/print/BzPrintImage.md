# BzPrintImage 组件

#### 介绍

printImage 是一个由博泽智造有限公司封装的打印组件，为了提高开发效率，完善产品。

#### 插件技术

vue3 + lodop + vue-easy-print + html2canvas + echarts

#### 使用说明

1. 引入（此处由全局引入）
2. 使用 ptintValue 是必传值，与其绑定的可以是字符串，数字，dom

   `<BzPrintImage :ptintValue="divRef1" />`

   `<BzPrintImage :ptintValue="divRef" ptintClass="mr20" />`

   `<BzPrintImage :ptintValue="123" ptintMold="tagsPreview" :ptintDanger="true" ptintTitle="打印预览" :ptintGhost="true" ptintIcon="PrinterOutlined" />`

   `<BzPrintImage :ptintValue="id" ptintMold="tagsDirect" ptintTitle="直接打印" ptintType="text" ptintSize="large" ptintClass="mr20" />`
3. 文档

| 参数名称        | 值                                                             | 默认值  | 是否必输 |
| --------------- | -------------------------------------------------------------- | ------- | -------- |
| ptintValue      | (值)number,string,dom                                          | 空      | 否       |
| ptintTitle      | (标题)string                                                   | 打印    | 否       |
| ptintType       | (设置按钮类型)primary,ghost,dashed,link,text,default           | primary | 否       |
| ptintMold       | (浏览器，lodop)browser 浏览器,tagsPreview 预览,tagsDirect 直接 | browser | 否       |
| ptintSize       | (设置按钮大小)large,middle,small                               | middle  | 否       |
| ptintLoading    | (设置按钮载入状态)boolean                                      | false   | 否       |
| ptintDanger     | (设置危险按钮)boolean                                          | false   | 否       |
| ptintDisabled   | (按钮失效状态)boolean                                          | false   | 否       |
| ptintGhost      | (幽灵属性，使按钮背景透明)boolean                              | false   | 否       |
| ptintShape      | (设置按钮形状)default,circle,default                           | default | 否       |
| ptintClass      | (class)string                                                  |         | 否       |
| ptintStyle      | (style)string,object                                           |         | 否       |
| ptintIcon       | (图标)string                                                   |         | 否       |
| ptintButtonShow | (按钮是否显示)boolean                                          | true    | 否       |

4. clickPrint 打印事件触发 也可以由父组件触发子组件的 click 事件.
   printBatch 批量打印。由父组件传值过来，值包装成数组形式['11','22','33'].
5. demo 参考页面 print @/views/demo/print.vue

#### 作者

1. 张三石
