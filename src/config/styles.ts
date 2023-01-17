
export default {
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, //注意，这一句是在less对象中，写在外边不起作用
        modifyVars: {
          //在这里进行主题的修改，参考官方配置属性
          '@primary-color': 'rgba(0, 98, 170,1)',
          '@link-color': 'rgba(0, 98, 170,1)',
          '@success-color': '#52c41a',
          '@warning-color': '#faad14',
          '@error-color': '#f5222d',
          '@font-size-base': '14px',
          '@heading-color': 'rgba(0, 0, 0, 0.85)',
          '@text-color': 'rgba(0, 0, 0, 0.65)',
          '@text-color-secondary': 'rgba(0, 0, 0, 0.45)',
          '@disabled-color': 'rgba(0, 0, 0, 0.25)',
          '@border-radius-base': '2px',
          '@border-color-base': '#d9d9d9',
          '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)'
        }
      }
    }
  }
}
