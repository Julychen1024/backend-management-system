import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, AppBar, Toolbar, useTheme } from '@mui/material';
import { useAuthStore } from '@/stores/auth-store';
import Sidebar from '@/layouts/sidebar';
import Header from '@/layouts/header';

/**
 * 主布局组件
 * 包含侧边栏、顶部导航和内容区域
 */
const MainLayout: React.FC = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user } = useAuthStore();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 顶部导航栏 */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - 240px)` },
          ml: { md: '240px' },
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Header onMenuClick={handleDrawerToggle} />
      </AppBar>

      {/* 侧边栏 */}
      <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}>
        {/* 移动端抽屉 */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // 更好的移动端性能
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}
        >
          <Sidebar user={user} />
        </Drawer>

        {/* 桌面端抽屉 */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}
          open
        >
          <Sidebar user={user} />
        </Drawer>
      </Box>

      {/* 主要内容区域 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 240px)` },
        }}
      >
        <Toolbar /> {/* 为顶部导航栏留出空间 */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
