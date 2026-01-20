// src/types/theme.ts
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemeConfig {
  mode: 'light' | 'dark';
  primary: ColorPalette;
  secondary: ColorPalette;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  spacing: (factor: number) => string;
}

export interface ThemeContextType {
  theme: ThemeConfig;
  toggleTheme: () => void;
  setTheme: (theme: Partial<ThemeConfig>) => void;
}
