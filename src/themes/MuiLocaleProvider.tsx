// src/providers/MuiLocaleProvider.tsx
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useThemeStore } from '@/stores/theme';
import { useI18nStore } from '@/stores/i18n';

interface MuiLocaleProviderProps {
  children: React.ReactNode;
}

export const MuiLocaleProvider: React.FC<MuiLocaleProviderProps> = ({ children }) => {
  const { theme: appTheme } = useThemeStore();
  const { muiLocale } = useI18nStore();

  // 合并主题和语言包
  const themeWithLocale = React.useMemo(() => {
    return createTheme(appTheme, muiLocale);
  }, [appTheme, muiLocale]);

  return <ThemeProvider theme={themeWithLocale}>{children}</ThemeProvider>;
};
