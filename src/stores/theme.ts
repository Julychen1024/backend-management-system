// src/stores/theme.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAppTheme } from '@/themes';
import type { AppTheme } from '@/themes';

interface ThemeState {
  mode: 'light' | 'dark';
  theme: AppTheme;
}

interface ThemeActions {
  toggleTheme: () => void;
  setMode: (mode: 'light' | 'dark') => void;
}

export type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: 'light',
      theme: createAppTheme({ mode: 'light' }),

      toggleTheme: () => {
        const { mode } = get();
        const newMode = mode === 'light' ? 'dark' : 'light';

        set({
          mode: newMode,
          theme: createAppTheme({ mode: newMode }),
        });

        // 同步更新HTML属性
        document.documentElement.setAttribute('data-theme', newMode);
        document.documentElement.style.colorScheme = newMode;
      },

      setMode: (mode: 'light' | 'dark') => {
        set({
          mode,
          theme: createAppTheme({ mode }),
        });

        document.documentElement.setAttribute('data-theme', mode);
        document.documentElement.style.colorScheme = mode;
      },
    }),
    {
      name: 'theme-storage',
      partialize: state => ({
        mode: state.mode,
      }),
    }
  )
);
