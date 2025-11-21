import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { routerConfig } from './route-config';
import RouterRenderer from '@/components/router-renderer';
import RoutePerformanceMonitor from '@/components/route-performance-monitor';
import { PreloadUtils } from '@/utils/preload-utils';

/**
 * 应用路由组件
 * 集成所有路由功能和性能优化
 */
const AppRouter: React.FC = () => {
  React.useEffect(() => {
    // 预加载关键路由
    PreloadUtils.preloadCriticalRoutes();

    // 设置全局链接预加载
    const setupLinkPreloading = () => {
      document.addEventListener('mouseover', e => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link) {
          PreloadUtils.preloadOnHover(link);
        }
      });
    };

    setupLinkPreloading();
  }, []);

  return (
    <BrowserRouter>
      <RoutePerformanceMonitor />
      <RouterRenderer routes={routerConfig} />
    </BrowserRouter>
  );
};

export default AppRouter;
