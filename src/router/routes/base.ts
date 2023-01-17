import { RouteRecordRaw } from 'vue-router';
const ERROR403 = () => import('@/views/error/403.vue');
const ERROR404 = () => import('@/views/error/404.vue');
const ERROR500 = () => import('@/views/error/500.vue');
const Login = () => import('@/views/login/index.vue');
const print = () => import('@/views/demo/print.vue');
const draggable = () => import('@/views/demo/draggable.vue');
const photographVue2 = () => import('@/views/demo/photographVue2.vue');
const photographVue3 = () => import('@/views/demo/photographVue3.vue');
const Viewerjs = () => import('@/views/demo/viewerjs.vue');
const baseRoute: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      title: '/',
      keepAlive: true
    }
  },
  {
    path: '/login',
    name: 'LOGIN',
    component: Login,
    meta: {
      title: '登录',
      keepAlive: true
    }
  },
  {
    path: '/403',
    name: 'ERROR403',
    component: ERROR403,
    meta: {
      title: '403',
      keepAlive: true
    }
  },
  {
    path: '/404',
    name: 'ERROR404',
    component: ERROR404,
    meta: {
      title: '404',
      keepAlive: true
    }
  },
  {
    path: '/500',
    name: 'ERROR500',
    component: ERROR500,
    meta: {
      title: '500',
      keepAlive: true
    }
  },
  {
    path: '/print',
    name: 'print',
    component: print,
    meta: {
      title: 'print',
    }
  },
  {
    path: '/draggable',
    name: 'draggable',
    component: draggable,
    meta: {
      title: 'draggable',
    }
  },
  {
    path: '/photographVue2',
    name: 'photographVue2',
    component: photographVue2,
    meta: {
      title: 'photographVue2',
    }
  },
  {
    path: '/photographVue3',
    name: 'photographVue3',
    component: photographVue3,
    meta: {
      title: 'photographVue3',
    }
  },
  {
    path: '/viewerjs',
    name: 'viewerjs',
    component: Viewerjs,
    meta: {
      title: 'viewerjs',
    }
  }

];

export default baseRoute;
