import axios from 'axios';
import { getAccessToken } from '@/utils/accessToken';
import router from '../router'
import { setMessageTips, setMessageOption } from "@/utils/common";
import { message } from 'ant-design-vue';

const instance = axios.create({
  timeout: 10000,
  baseURL: '/smart-audit/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
const blobUrl = ['/inventory/material/exportInventoryMaterialLog']
/**
 * 请求拦截
 */
instance.interceptors.request.use(async (config: any) => {
  let sessionToken = getAccessToken();
  config.headers.Authorization = sessionToken;
  if (blobUrl.includes(config.url)) config.responseType = "blob"
  return config;
});

/**
 * 响应拦截
 */
instance.interceptors.response.use(
  (response: any) => {
    const { data, config, status } = response;
    const { errorCode, errorMessage } = data;
    if (status === 200) {
      if (errorCode === '00000') { //正常
        return data;
      } else if (errorCode === 'A0170') { //重置到登录页
        setMessageOption('error', 'token失效')
        router.push('/login')
      } else { //有提示语 执行提示语
        setMessageTips(data);
        return Promise.reject(data);
      }
    } else {
      // console.log(334565)
      // return Promise.reject(
      //   '请求异常:' + JSON.stringify({ url: config.url, errorCode, errorMessage }) || 'Error'
      // );
    }
  },
  (error: any) => {
    let mess = JSON.parse(JSON.stringify(error))
    message.error(mess.message, 2)
    return Promise.reject();
  }
);
export default instance;
