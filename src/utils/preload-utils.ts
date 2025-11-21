/**
 * 路由预加载工具
 * 实现智能预加载策略，提升用户体验
 */
export class PreloadUtils {
  private static preloadedRoutes = new Set<string>();

  /**
   * 预加载路由组件
   */
  static preloadRoute(routePath: string): void {
    if (this.preloadedRoutes.has(routePath)) {
      return;
    }

    // 根据路由路径映射到对应的组件
    const componentMap: Record<string, () => Promise<unknown>> = {
      '/dashboard': () => import('@/pages/dashboard/'),
      '/users': () => import('@/pages/system/user/'),
      '/login': () => import('@/pages/login'),
      // 添加更多路由映射...
    };

    const preloadComponent = componentMap[routePath];
    if (preloadComponent) {
      preloadComponent().catch(console.error);
      this.preloadedRoutes.add(routePath);
    }
  }

  /**
   * 预加载可见链接
   * 在鼠标悬停时预加载目标路由
   */
  static preloadOnHover(linkElement: HTMLElement): void {
    const href = linkElement.getAttribute('href');
    if (href?.startsWith('/')) {
      linkElement.addEventListener(
        'mouseenter',
        () => {
          this.preloadRoute(href);
        },
        { once: true }
      );
    }
  }

  /**
   * 预加载关键路由
   * 应用启动时预加载关键页面
   */
  static preloadCriticalRoutes(): void {
    const criticalRoutes = ['/dashboard', '/users'];
    criticalRoutes.forEach(route => this.preloadRoute(route));
  }

  /**
   * 清理预加载缓存
   */
  static clearPreloadCache(): void {
    this.preloadedRoutes.clear();
  }
}
