import React from 'react';
import { RouteConfig } from '@/types/router';

// 懒加载页面组件
const Dashboard = React.lazy(() => import('@/pages/dashboard/'));
const User = React.lazy(() => import('@/pages/system/user'));
const Role = React.lazy(() => import('@/pages/system/role'));
const Login = React.lazy(() => import('@/pages/login'));
const NotFound = React.lazy(() => import('@/pages/error/404'));
const Unauthorized = React.lazy(() => import('@/pages/error/403'));

/**
 * 应用路由配置
 * 基于文件系统的路由自动生成方案
 */
export const routerConfig: RouteConfig[] = [
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
  {
    path: '/',
    component: React.lazy(() => import('@/layouts/main-layout')),
    meta: {
      title: '首页',
      requiresAuth: true,
    },
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
        meta: {
          title: '数据看板',
          requiresAuth: true,
          icon: 'Dashboard',
        },
        permissions: ['dashboard:view'],
      },
      {
        path: 'users',
        component: React.lazy(() => import('@/layouts/page-layout')),
        meta: {
          title: '用户管理',
          requiresAuth: true,
          icon: 'People',
        },
        permissions: ['user:view'],
        children: [
          {
            path: 'user',
            component: User,
            meta: {
              title: '用户',
              requiresAuth: true,
            },
            permissions: ['user:view'],
          },
          {
            path: 'role',
            component: Role,
            meta: {
              title: '角色',
              requiresAuth: true,
            },
            permissions: ['user:view'],
          },
        ],
      },
    ],
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
    meta: {
      title: '未授权',
      requiresAuth: false,
    },
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: '页面未找到',
      requiresAuth: false,
    },
  },
];
