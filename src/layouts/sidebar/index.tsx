import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface SidebarProps {
  user?: {
    username: string;
    email: string;
  } | null;
}

/**
 * 侧边栏导航组件
 */
const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 生成菜单项（这里简化处理，实际应该从路由配置生成）
  const menuItems = [
    {
      key: '/dashboard',
      label: '数据看板',
      path: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      key: '/users',
      label: '用户管理',
      path: '/users/user',
      icon: <PeopleIcon />,
    },
  ];

  const handleMenuClick = (path: string) => {
    void navigate(path);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 用户信息区域 */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 1,
          }}
        >
          后台管理系统
        </Typography>
        {user && (
          <>
            <Avatar
              sx={{
                mx: 'auto',
                mb: 1,
                bgcolor: 'primary.main',
                width: 40,
                height: 40,
              }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" fontWeight="medium">
              {user.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </>
        )}
      </Box>

      <Divider />

      {/* 导航菜单 */}
      <List sx={{ flexGrow: 1, p: 1 }}>
        {menuItems.map(item => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* 底部区域 */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <ListItemButton
          sx={{
            borderRadius: 1,
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="系统设置" />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
