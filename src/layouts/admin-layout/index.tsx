// src/layouts/AdminLayout.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from '@/layouts/sidebar';
import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '../config';
import { useAppStore } from '@/stores/app';
import { Outlet } from 'react-router';

const AdminLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    sidebar: { collapsed },
    setSidebarCollapsed,
  } = useAppStore();

  const handleDrawerToggle = () => {
    setSidebarCollapsed(isMobile ? false : !collapsed);
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
      />

      {/* 主内容区域 */}
      <div
        className="flex flex-col overflow-hidden"
        style={{
          width: '100%',
          paddingLeft: isMobile ? '0' : collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
        }}
      >
        {/* 顶部导航栏 */}
        <AppBar
          className="border-b border-gray-200"
          position="static"
          elevation={0}
          sx={theme => ({ backgroundColor: theme.palette.background.default })}
        >
          <Toolbar className="!px-2" sx={{ minHeight: `${HEADER_HEIGHT}px !important` }}>
            <IconButton
              size="small"
              edge="start"
              className="!mr-4 !text-gray-600"
              aria-label="打开菜单"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="flex-1 font-semibold" color="text.primary">
              后台管理系统
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 页面内容 */}
        <main
          className="overflow-auto p-2"
          style={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
