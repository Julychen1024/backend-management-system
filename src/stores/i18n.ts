// src/stores/i18n.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { i18n, muiLocales } from '@/locales/config';

interface I18nState {
  language: string;
  muiLocale: object;
  isLoading: boolean;
}

interface I18nActions {
  changeLanguage: (lng: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export type I18nStore = I18nState & I18nActions;

export const useI18nStore = create<I18nStore>()(
  persist(
    (set, get) => ({
      language: 'zh-CN',
      muiLocale: muiLocales['zh-CN'],
      isLoading: false,

      changeLanguage: async (lng: string) => {
        const { language: currentLang } = get();
        if (currentLang === lng) return;

        set({ isLoading: true });

        try {
          // 切换i18next语言
          await i18n.changeLanguage(lng);

          // 更新MUI语言包
          const newMuiLocale = muiLocales[lng] ?? muiLocales['zh-CN'];

          set({
            language: lng,
            muiLocale: newMuiLocale,
            isLoading: false,
          });

          // 更新HTML lang属性
          document.documentElement.lang = lng;

          // 触发自定义事件，通知其他组件
          window.dispatchEvent(new CustomEvent('languageChanged', { detail: lng }));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'i18n-storage',
      partialize: state => ({
        language: state.language,
      }),
    }
  )
);
