// src/App.tsx
import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/app';
import RouterRenderer from '@/routers/RouterRenderer';
import { routes } from '@/routers';

const App: React.FC = () => {
  const { theme } = useAppStore();

  // 初始化主题
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <RouterRenderer routes={routes} />;
};

export default App;
