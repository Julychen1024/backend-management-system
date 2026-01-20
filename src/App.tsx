// src/App.tsx
import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/app';
import { RouterProvider } from 'react-router';
import { router } from './routers';

const App: React.FC = () => {
  const { theme } = useAppStore();

  // 初始化主题
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
