import { RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
const lomWelcome = () => import('@/pages/welcome/index.vue');
const settingUser = () => import('@/pages/setting/user/index.vue');
const settingRole = () => import('@/pages/setting/role/index.vue');
const settingMenu = () => import('@/pages/setting/menu/index.vue');
const settingDept = () => import('@/pages/setting/dept/index.vue');
const DictionaryItem = () => import('@/pages/setting/dictionary/item/index.vue')
const Dictionary = () => import('@/pages/setting/dictionary/dictionary/index.vue')
const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: Layout,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/welcome',
        name: 'lomWelcome',
        component: lomWelcome,
        meta: {
          title: '首页',
          titleEn: 'Welcome',
          keepAlive: true
        }
      }

    ]
  },
  {
    path: '',
    component: Layout,
    meta: { title: '系统设置' },
    children: [
      {
        path: '/setting/user',
        name: 'settingUser',
        component: settingUser,
        meta: {
          title: '用户管理',
          titleEn: 'User',
          keepAlive: true
        }
      },
      {
        path: '/setting/role',
        name: 'settingRole',
        component: settingRole,
        meta: {
          title: '角色管理',
          titleEn: 'Role',
          keepAlive: true
        }
      },
      {
        path: '/setting/menu',
        name: 'settingMenu',
        component: settingMenu,
        meta: {
          title: '菜单管理',
          titleEn: 'Menu',
          keepAlive: true
        }
      },
      {
        path: '/setting/dept',
        name: 'settingDept',
        component: settingDept,
        meta: {
          title: '部门管理',
          titleEn: 'Department',
          keepAlive: true
        }
      },
      {
        path: '/setting/dictionary',
        name: 'Dictionary',
        component: Dictionary,
        meta: {
          title: '字典管理',
          titleEn: 'Dictionary',
          keepAlive: true
        }
      },
      {
        path: '/setting/dictionary/Item',
        name: 'Item',
        component: DictionaryItem,
        meta: {
          title: '字典项',
          titleEn: 'DictionaryItem',
          keepAlive: false
        }
      },
      
    ]
  }
];

export default routes;
