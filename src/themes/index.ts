// src/theme/index.ts
import { createTheme } from '@mui/material/styles';
import type { ThemeConfig, ColorPalette } from '@/types/theme';

// 品牌色板定义
const primaryPalette: ColorPalette = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
};

const secondaryPalette: ColorPalette = {
  50: '#f5f3ff',
  100: '#ede9fe',
  200: '#ddd6fe',
  300: '#c4b5fd',
  400: '#a78bfa',
  500: '#8b5cf6',
  600: '#7c3aed',
  700: '#6d28d9',
  800: '#5b21b6',
  900: '#4c1d95',
};

const infoPalette: ColorPalette = {
  50: '#f0f9ff',
  100: '#e0f2fe',
  200: '#bae6fd',
  300: '#7dd3fc',
  400: '#38bdf8',
  500: '#0ea5e9',
  600: '#0284c7',
  700: '#0369a1',
  800: '#075985',
  900: '#0c4a6e',
};

const successPalette: ColorPalette = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
};

const warningPalette: ColorPalette = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
};

const errorPalette: ColorPalette = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
};

// 基础主题配置
export const createAppTheme = (config: Partial<ThemeConfig> = {}) => {
  const { mode = 'light' } = config;

  const isLight = mode === 'light';

  return createTheme({
    cssVariables: true, // 启用CSS变量支持
    palette: {
      mode,
      primary: {
        main: primaryPalette[500],
        light: primaryPalette[300],
        dark: primaryPalette[700],
        contrastText: '#ffffff',
      },
      secondary: {
        main: secondaryPalette[500],
        light: secondaryPalette[300],
        dark: secondaryPalette[700],
        contrastText: '#ffffff',
      },
      info: {
        main: infoPalette[500],
        light: infoPalette[300],
        dark: infoPalette[700],
        contrastText: '#ffffff',
      },
      success: {
        main: successPalette[500],
        light: successPalette[300],
        dark: successPalette[700],
        contrastText: '#ffffff',
      },
      warning: {
        main: warningPalette[500],
        light: warningPalette[300],
        dark: warningPalette[700],
        contrastText: '#ffffff',
      },
      error: {
        main: errorPalette[500],
        light: errorPalette[300],
        dark: errorPalette[700],
        contrastText: '#ffffff',
      },
      background: {
        default: isLight ? '#f8fafc' : '#0f172a',
        paper: isLight ? '#ffffff' : '#1e293b',
      },
      text: {
        primary: isLight ? '#1e293b' : '#f1f5f9',
        secondary: isLight ? '#64748b' : '#94a3b8',
      },
      grey: {
        50: isLight ? '#f8fafc' : '#0f172a',
        100: isLight ? '#f1f5f9' : '#1e293b',
        200: isLight ? '#e2e8f0' : '#334155',
        300: isLight ? '#cbd5e1' : '#475569',
        400: isLight ? '#94a3b8' : '#64748b',
        500: isLight ? '#64748b' : '#94a3b8',
        600: isLight ? '#475569' : '#cbd5e1',
        700: isLight ? '#334155' : '#e2e8f0',
        800: isLight ? '#1e293b' : '#f1f5f9',
        900: isLight ? '#0f172a' : '#f8fafc',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      button: {
        textTransform: 'none' as const, // 禁用大写转换，更符合现代设计
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    spacing: 8, // 8px基准单位
    components: {
      MuiListItemButton: {
        defaultProps: {
          dense: true,
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
          className: 'hover:!shadow-2xs',
          sx: {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
  });
};

// 主题模式类型
export type AppTheme = ReturnType<typeof createAppTheme>;
