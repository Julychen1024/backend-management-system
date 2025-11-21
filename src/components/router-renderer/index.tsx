import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteConfig } from '@/types/router';
import RouteGuard from '../route-guard';
import LoadingSpinner from '../loading-spinner';

interface RouterRendererProps {
  routes: RouteConfig[];
}

/**
 * 路由渲染器组件
 * 根据路由配置动态生成路由结构
 */
const RouterRenderer: React.FC<RouterRendererProps> = ({ routes }) => {
  const renderRoutes = (routeList: RouteConfig[]): React.ReactNode[] => {
    return routeList.map(route => {
      const element = (
        <React.Suspense fallback={<LoadingSpinner />}>
          <RouteGuard requiresAuth={route.meta?.requiresAuth} permissions={route.permissions}>
            <route.component />
          </RouteGuard>
        </React.Suspense>
      );

      return (
        <Route
          key={route.path}
          path={route.path}
          element={element}
          // loader 和 action 在 React Router v7 中通过其他方式配置
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    });
  };

  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default RouterRenderer;
