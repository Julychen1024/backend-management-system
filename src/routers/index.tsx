import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import type { AppRoute } from '@/types/router';
import AuthGuard from '@/components/guard/AuthGuard';
import { Loading } from '@/components/loading';
import AdminLayout from '@/layouts/admin-layout';
import BlankLayout from '@/layouts/blank-layout';

// 懒加载包装函数
const lazyLoad = (Comp: React.ComponentType) => (
  <Suspense fallback={<Loading fullScreen text="loading..." />}>
    <Comp />
  </Suspense>
);

// 页面组件懒加载
const Login = lazy(() => import('@/pages/login'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const User = lazy(() => import('@/pages/system/user'));
const NotFound = lazy(() => import('@/pages/errors/404'));
const ThemeShowcase = lazy(() => import('@/pages/theme-showcase'));

const routes: AppRoute[] = [
  {
    path: '/',
    element: (
      <AuthGuard requiresAuth>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: lazyLoad(Dashboard),
        meta: { title: '仪表板', requiresAuth: true },
      },
      {
        path: 'users',
        element: lazyLoad(User),
        meta: { title: '用户管理', requiresAuth: true },
      },
      {
        path: 'theme-showcase',
        element: lazyLoad(ThemeShowcase),
        meta: { title: '主题使用示例', requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthGuard requiresAuth={false}>
        <BlankLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: lazyLoad(Login),
        meta: { title: '登录', requiresAuth: false },
      },
    ],
  },
  {
    path: '*',
    element: lazyLoad(NotFound),
    meta: { title: '页面不存在', requiresAuth: false },
  },
] as AppRoute[];

export const router = createBrowserRouter(routes);
