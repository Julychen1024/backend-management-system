import React from 'react';
import { Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem, Chip } from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/stores/auth-store';

interface HeaderProps {
  onMenuClick: () => void;
}

/**
 * 顶部导航头部组件
 */
const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <Toolbar>
      {/* 移动端菜单按钮 */}
      <IconButton
        color="inherit"
        aria-label="打开菜单"
        edge="start"
        onClick={onMenuClick}
        sx={{ mr: 2, display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      {/* 标题 */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        后台管理系统
      </Typography>

      {/* 通知按钮 */}
      <IconButton color="inherit" sx={{ mr: 1 }}>
        <NotificationsIcon />
      </IconButton>

      {/* 用户信息 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          label={user?.username ?? '未登录'}
          variant="outlined"
          sx={{
            color: 'inherit',
            borderColor: 'rgba(255, 255, 255, 0.3)',
          }}
        />
        <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{ p: 0.5 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'secondary.main',
            }}
          >
            {user?.username?.charAt(0).toUpperCase() ?? 'U'}
          </Avatar>
        </IconButton>
      </Box>

      {/* 用户菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <AccountIcon sx={{ mr: 1 }} />
          个人资料
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          退出登录
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default Header;
