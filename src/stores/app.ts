// src/stores/app.ts
import { AppStore } from '@/types/app';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create<AppStore>()(
  persist(
    set => ({
      // 初始状态
      theme: 'light',
      language: 'zh-CN',
      sidebar: {
        collapsed: false,
      },

      // Actions
      setTheme: theme => {
        set({ theme });
        // 同步更新HTML的data-theme属性，用于CSS变量
        document.documentElement.setAttribute('data-theme', theme);
      },

      setLanguage: language => {
        set({ language });
      },

      toggleSidebar: () => {
        set(state => ({
          sidebar: {
            ...state.sidebar,
            collapsed: !state.sidebar.collapsed,
          },
        }));
      },

      setSidebarCollapsed: collapsed => {
        set(state => ({
          sidebar: {
            ...state.sidebar,
            collapsed,
          },
        }));
      },
    }),
    {
      name: 'app-storage',
    }
  )
);
