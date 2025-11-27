export interface AppState {
  theme: 'light' | 'dark';
  language: string;
  sidebar: {
    collapsed: boolean;
  };
}

export interface AppActions {
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: string) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export type AppStore = AppState & AppActions;
