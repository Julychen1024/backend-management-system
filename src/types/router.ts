import { LoaderFunction, ActionFunction } from 'react-router-dom';

// 路由配置接口
export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<unknown>>;
  loader?: LoaderFunction;
  action?: ActionFunction;
  errorElement?: React.ComponentType;
  children?: RouteConfig[];
  permissions?: string[];
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    icon?: string;
  };
}

// 路由元数据
export interface RouteMeta {
  title: string;
  requiresAuth: boolean;
  permissions: string[];
  icon?: string;
}

// 加载器返回数据类型
export interface LoaderData<T> {
  data: T;
  success: boolean;
  message?: string;
}

// 动作返回数据类型
export interface ActionData {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}
