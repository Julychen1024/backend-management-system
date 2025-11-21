import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RoutePerformanceMetrics {
  routePath: string;
  loadTime: number;
  renderTime: number;
  success: boolean;
}

/**
 * 路由性能监控组件
 * 收集路由加载和渲染性能数据
 */
const RoutePerformanceMonitor: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const startTime = performance.now();
    let renderTime = 0;

    const measurePerformance = () => {
      const loadTime = performance.now() - startTime;

      // 发送性能数据到监控服务
      const metrics: RoutePerformanceMetrics = {
        routePath: location.pathname,
        loadTime,
        renderTime,
        success: true,
      };

      // 开发环境下显示性能提示
      if (import.meta.env.MODE === 'development') {
        // 在实际项目中，这里可以发送到监控服务
        console.log('Route Performance Metrics:', metrics);
        if (loadTime > 1000) {
          console.warn(`路由 ${location.pathname} 加载较慢: ${loadTime.toFixed(2)}ms`);
        }
      }
    };

    // 设置性能测量
    const timeoutId = setTimeout(measurePerformance, 100);

    return () => {
      clearTimeout(timeoutId);
      renderTime = performance.now() - startTime;
    };
  }, [location.pathname]);

  return null;
};

export default RoutePerformanceMonitor;
