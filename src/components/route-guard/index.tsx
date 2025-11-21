import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth-store';
import LoadingSpinner from '../loading-spinner';

interface RouteGuardProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  permissions?: string[];
}

/**
 * 路由权限守卫组件
 * 实现页面级权限控制
 */
const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiresAuth = false,
  permissions = [],
}) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  // 显示加载状态
  if (isLoading) {
    return <LoadingSpinner message="验证权限中..." />;
  }

  // 需要认证但未登录
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 检查权限
  if (requiresAuth && permissions.length > 0) {
    const userPermissions = user?.permissions ?? [];
    const hasPermission = permissions.some(permission => userPermissions.includes(permission));

    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // 已登录但访问登录页，重定向到首页
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
