import { RouteConfig } from '@/types/router';

export interface MenuItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  permissions?: string[];
}

/**
 * 菜单工具类
 * 根据路由配置生成导航菜单
 */
export class MenuUtils {
  /**
   * 从路由配置生成菜单项
   */
  static generateMenusFromRoutes(
    routes: RouteConfig[],
    userPermissions: string[] = []
  ): MenuItem[] {
    const buildMenu = (routeList: RouteConfig[], basePath = ''): MenuItem[] => {
      const menuItems: MenuItem[] = [];

      routeList.forEach(route => {
        // 跳过没有meta信息或不需要显示在菜单中的路由
        if (!route.meta?.title || route.meta.requiresAuth === false) {
          return;
        }

        // 检查权限
        if (route.permissions && route.permissions.length > 0) {
          const hasPermission = route.permissions.some(permission =>
            userPermissions.includes(permission)
          );
          if (!hasPermission) return;
        }

        const fullPath = basePath + route.path;
        const menuItem: MenuItem = {
          key: fullPath,
          label: route.meta.title,
          path: fullPath,
          icon: route.meta.icon,
          permissions: route.permissions,
        };

        // 处理子路由
        if (route.children && route.children.length > 0) {
          const childMenus = buildMenu(route.children, fullPath);
          if (childMenus.length > 0) {
            menuItem.children = childMenus;
          }
        }

        menuItems.push(menuItem);
      });

      return menuItems;
    };

    return buildMenu(routes);
  }

  /**
   * 查找当前激活的菜单项
   */
  static findActiveMenu(menus: MenuItem[], currentPath: string): string[] {
    const activeKeys: string[] = [];

    const findActive = (menuList: MenuItem[]): boolean => {
      for (const menu of menuList) {
        if (currentPath.startsWith(menu.path)) {
          activeKeys.push(menu.key);

          if (menu.children) {
            findActive(menu.children);
          }
          return true;
        }
      }
      return false;
    };

    findActive(menus);
    return activeKeys;
  }

  /**
   * 扁平化菜单项（用于面包屑）
   */
  static flattenMenuItems(menus: MenuItem[]): MenuItem[] {
    const flattened: MenuItem[] = [];

    const flatten = (menuList: MenuItem[]) => {
      menuList.forEach(menu => {
        flattened.push(menu);
        if (menu.children) {
          flatten(menu.children);
        }
      });
    };

    flatten(menus);
    return flattened;
  }
}
