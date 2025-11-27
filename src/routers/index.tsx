import { lazy } from 'react';
import type { RouteItem } from '@/types/router';

// 懒加载页面组件
const Login = lazy(() => import('@/pages/login'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const User = lazy(() => import('@/pages/system/user'));
const NotFound = lazy(() => import('@/pages/errors/404'));

// 布局组件
import AdminLayout from '@/layouts/admin-layout';
import BlankLayout from '@/layouts/blank-layout';

export const routes: RouteItem[] = [
  {
    path: '/login',
    component: Login,
    layout: BlankLayout,
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
  {
    path: '/users',
    component: User,
    layout: AdminLayout,
    meta: {
      title: '用户管理',
      requiresAuth: true,
    },
  },
  {
    path: '/',
    component: Dashboard,
    layout: AdminLayout,
    meta: {
      title: '仪表板',
      requiresAuth: true,
    },
  },
  {
    path: '*',
    component: NotFound,
    layout: BlankLayout,
    meta: {
      title: '页面不存在',
      requiresAuth: false,
    },
  },
];
