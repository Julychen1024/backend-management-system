export interface LayoutState {
  collapsed: boolean;
  mobileOpen: boolean;
}

export interface LayoutContextType {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapsed: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}
