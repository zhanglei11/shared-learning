// 此文件存放基础类型 

//地址
const VITE_API_URL = '192.168.1.203:12777/' //线上
// const VITE_API_URL = 'http://192.168.2.32:8092/' //本地

//分页标准
const layouts = ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total'];

const pageSizesList = [10, 20, 50, 100];

export {
  VITE_API_URL,
  layouts,
  pageSizesList
}