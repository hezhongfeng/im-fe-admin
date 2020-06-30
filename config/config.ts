// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '@/layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: '@/pages/user/login',
        },
      ],
    },
    {
      path: '/',
      component: '@/layouts/SecurityLayout',
      authority: ['admin'],
      routes: [
        {
          path: '/',
          redirect: '/admin/welcome',
        },
        {
          path: '/admin',
          component: '@/layouts/BasicLayout',
          authority: ['admin'],
          routes: [
            {
              path: '/admin/welcome',
              name: 'welcome',
              icon: 'smile',
              component: '@/pages/Welcome',
              authority: ['admin'],
            },
            {
              name: 'admin.group',
              icon: 'table',
              path: '/admin/group',
              component: '@/pages/GroupTableList',
              authority: ['admin'],
            },
            {
              name: 'admin.user',
              icon: 'table',
              path: '/admin/user',
              component: '@/pages/UserTableList',
              authority: ['admin'],
            },
            {
              name: 'admin.role',
              icon: 'table',
              path: '/admin/role',
              component: '@/pages/RoleTableList',
              authority: ['admin'],
            },
            {
              name: 'admin.right',
              icon: 'table',
              path: '/admin/right',
              component: '@/pages/RightTableList',
              authority: ['admin'],
            },
            {
              component: '@/pages/404',
            },
          ],
        },
        {
          component: '@/pages/404',
        },
      ],
    },
    {
      component: '@/pages/404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
