import { RouteConfig } from '@/types/router';

/**
 * 路由工具类
 * 提供路由配置、权限验证等工具方法
 */
export class RouterUtils {
  /**
   * 扁平化路由配置
   * 将嵌套路由转换为扁平数组，便于权限检查
   */
  static flattenRoutes(routes: RouteConfig[]): RouteConfig[] {
    const flattened: RouteConfig[] = [];

    const flatten = (routeList: RouteConfig[]) => {
      routeList.forEach(route => {
        flattened.push(route);
        if (route.children) {
          flatten(route.children);
        }
      });
    };

    flatten(routes);
    return flattened;
  }

  /**
   * 根据权限过滤路由
   */
  static filterRoutesByPermission(
    routes: RouteConfig[],
    userPermissions: string[] = []
  ): RouteConfig[] {
    return routes.filter(route => {
      // 如果没有权限要求，则所有用户都可访问
      if (!route.permissions || route.permissions.length === 0) {
        return true;
      }

      // 检查用户是否拥有所需权限
      return route.permissions.some(permission => userPermissions.includes(permission));
    });
  }

  /**
   * 生成面包屑导航数据
   */
  static generateBreadcrumbs(
    routes: RouteConfig[],
    currentPath: string
  ): { path: string; title: string }[] {
    const breadcrumbs: { path: string; title: string }[] = [];

    const findPath = (routeList: RouteConfig[], path: string): boolean => {
      for (const route of routeList) {
        if (route.path === path && route.meta?.title) {
          breadcrumbs.unshift({
            path: route.path,
            title: route.meta.title,
          });
          return true;
        }

        if (route.children && findPath(route.children, path)) {
          if (route.meta?.title) {
            breadcrumbs.unshift({
              path: route.path,
              title: route.meta.title,
            });
          }
          return true;
        }
      }
      return false;
    };

    findPath(routes, currentPath);
    return breadcrumbs;
  }

  /**
   * 验证路由路径是否有效
   */
  static isValidRoute(path: string, routes: RouteConfig[]): boolean {
    const flattened = this.flattenRoutes(routes);
    return flattened.some(route => route.path === path);
  }
}
