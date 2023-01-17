import { message } from 'ant-design-vue';
import moment from 'moment';
import i18n from './../i18n';

const isNull = (str: any) => {
  return str === null || typeof str === 'undefined' || str === '' ? null : str;
};

/**
 * 数据合并规则 2021-11-1
 * arrA 对象A
 * arrB 对象B
 * 将对象B与对象A相同属性的进行赋值
 * @param {array}
 * @returns {array}
 */
export const public_form_data_replace = (arrA: any, arrB: any) => {
  Object.keys(arrA).forEach((key) => {
    arrA[key] = isNull(arrB[key]);
  });
  return arrA;
};

/**
 * 数据清空 2021-11-1
 * arrA 清空的对象
 * arrB 不清空的值组成的数组数组 ['a','b']
 * @param {array}
 * @returns {array}
 */
export const public_form_empty = (arrA: any, arrB: any = []) => {
  Object.keys(arrA).forEach((key) => {
    if (!arrB.includes(key)) {
      arrA[key] = null;
    }
  });
  return arrA;
};

/**
 * 时间格式返回值
 * 1 time 时间
 * 2 format 格式
 * @returns { string }
 * @zhanglei
 * 此方法为公共方法，涉及面比较广  请勿随便更改
 */
export const setMoment = (time: any, format: any = 'YYYY-MM-DD') => {
  return time ? moment(time).format(format) : '';
};


/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export const handleTree = (
  data: Array<any>,
  id?: string,
  parentId: any = 'parentId',
  children: any = 'children'
) => {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  let childrenListMap = {};
  let nodeIds = {};
  let tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];

    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];

    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
};

/**
 * 信息提示语
 * @zhanglei
 * @item string 接口返回的
 * 此为公共数组，涉及面比较广  请勿随便更改
 */
export const setMessageTips = async (res: any) => {
  const duration = 2;
  if (res.errorCode == '00000') {
    message.success(getMessage(res), duration)
  } else {
    message.error(getMessage(res), duration);
  }
};

export const setMessageOption = async (type: any, value: any) => {
  const { t } = i18n.global;
  const duration = 2;
  switch (type) {
    case 'success':
      message.success(value ? t(`base.${value}`) : t('base.操作成功'), duration)
      break;
    case 'error':
      message.error(value ? t(`base.${value}`) : t('base.操作失败'), duration)
      break;
    default:
      break;
  }
};
const getMessage = (res: any) => {
  const { t } = i18n.global;
  // const list = {
  //   'ERRORDATACODE': t('base.数据格式错误'),
  //   '00000': t('base.操作成功'),
  //   'A0001': t('base.用户端错误'),
  //   'A0101': t('base.用户未同意隐私协议'),
  //   'A0102': t('base.注册国家或地区受限'),
  //   'A0110': t('base.用户名效验失败'),
  //   'A0111': t('base.用户已存在'),
  //   'A0112': t('base.用户名包含敏感词'),
  //   'A0113': t('base.用户名包含特殊字符'),
  //   'A0210': t('base.用户密码错误'),
  //   'A2001': t('base.数据不存在'),
  //   'A3001': t('base.编号已存在'),
  //   'A3002': t('base.数据被引用'),
  //   'A3003': t('base.物料类型等级已存在'),
  //   'A3004': t('base.层列坐标已存在'),
  //   'A3005': t('base.没有可添加的物料'),
  //   'A3006': t('base.设备已被绑定'),
  //   'A3007': t('base.没有空通道'),
  //   'A3008': t('base.该物料无库存'),
  //   'A3009': t('base.该序列号库存中不存在'),
  //   'A3010': t('base.该序列号已经拼盘'),
  //   'A3011': t('base.不要重复添加'),
  //   'A3012': t('base.超出容量'),
  //   'A3013': t('base.取料通道错误'),
  // };
  let name = res.errorMessage == undefined ? res.errorMessage : res.errorMessage;
  return name;
};


//过滤
export const filterOption = (input: any, option: any) => {
  //搜索过滤
  if (
    option.key?.toLowerCase().includes(input.toLowerCase()) ||
    option.data?.toLowerCase().includes(input.toLowerCase()) ||
    option.label?.toLowerCase().includes(input.toLowerCase()) ||
    option.data_2?.toLowerCase().includes(input.toLowerCase()) ||
    option.data_3?.toLowerCase().includes(input.toLowerCase()) ||
    option.data_4?.toLowerCase().includes(input.toLowerCase())
  ) {
    return true;
  }
  return false;

};

//导出表格
export const exportBlod = (res: any, name: any) => {
  const blob = new Blob([res], { type: 'application/ms-excel;charset=utf-8' });
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = name; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象
};

/**
 *
 * @zhanglei
 * 此为公共数组，涉及面比较广  请勿随便更改
 */
let timeout: any;
export const debounce = (func: any, wait = 2000) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    func.apply();
  }, wait);
};

/**
 * 节流
 * @param {*} awaitTime 时间戳 定时器时间毫秒数
 * @param {*} fun 传入的函数
 * @param {*} arrAgu 传入的函数的参数
 */
export const stopUpDownFunList = (awaitTime = 2000) => {
  let startTimer = 0;
  //节流  一段时间只能执行一次 使用时间戳控制
  const retrunStopUpDown = (fun: any, ...arrAgu: any) => {
    if (typeof fun !== 'function') return
    let endTimer = new Date().getTime()
    if (endTimer - startTimer > awaitTime) {
      fun(...arrAgu)
      startTimer = new Date().getTime()
    }
  }
  return retrunStopUpDown
}

