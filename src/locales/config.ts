// src/i18n/config.ts
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { zhCN, enUS, viVN } from '@mui/material/locale';

// MUI语言包映射
export const muiLocales: Record<string, object> = {
  'zh-CN': zhCN,
  en: enUS,
  vi: viVN,
};

// 动态导入函数：返回Promise<资源模块>
const loadLocaleResource = (language: string, namespace: string) => {
  // Vite魔法注释：确保按命名空间分包
  // /* webpackChunkName: "i18n-[language]-[namespace]" */
  return import(
    /* @vite-ignore */
    `./${language}/${namespace}.json`
  );
};

export const i18n = i18next
  .use(initReactI18next) // 绑定React
  .use(LanguageDetector) // 自动检测语言
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // 兜底：如果语言包不存在，回退到英语
      const supportedLangs = ['en', 'vi', 'zh-CN'];
      const lang = supportedLangs.includes(language) ? language : 'en';

      return loadLocaleResource(lang, namespace).catch(() => {
        // 降级策略：加载英语包
        if (lang !== 'en') {
          return loadLocaleResource('en', namespace);
        }
        throw new Error(`Failed to load ${namespace} for ${language}`);
      });
    })
  );

// 初始化配置
export const initI18n = () => {
  return i18n.init({
    // 调试模式：仅在开发环境开启
    debug: import.meta.env.DEV,

    // 默认命名空间：未指定时使用 common
    defaultNS: 'common',

    // 同时支持 zh 和 zh-CN
    supportedLngs: ['en', 'vi', 'zh', 'zh-CN'],

    // 标准化策略
    nonExplicitSupportedLngs: true, // 允许 zh-CN 匹配 zh

    // 回退策略
    fallbackLng: {
      zh: ['zh-CN'], // zh 找不到资源时回退到 zh-CN
      default: ['en'],
    },

    // 资源加载模式
    load: 'currentOnly', // 只加载当前语言，不加载回退链

    // 检测配置
    detection: {
      // 优先级：localStorage > navigator > htmlTag
      order: ['localStorage', 'navigator', 'htmlTag'],

      // localStorage的key名
      lookupLocalStorage: 'i18nextLng',

      // 自动转换检测到的语言
      convertDetectedLanguage: (lng: string) => {
        return lng.startsWith('zh') ? 'zh-CN' : lng;
      },

      // Cookie配置（可选）
      // lookupCookie: 'i18next',
      // caches: ['localStorage', 'cookie'],
    },

    // 插值格式
    interpolation: {
      escapeValue: false, // React已自动转义
      formatSeparator: ',',
    },

    // 资源加载成功后的回调
    initImmediate: false,
  });
};
