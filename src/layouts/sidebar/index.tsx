import React from 'react';
import { Drawer, List } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  MenuOutlined,
  DisplaySettings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '../config';
import { MenuItemComponent } from './MenuItem';

interface MenuItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  isMobile: boolean;
  onDrawerToggle: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    text: '仪表板',
    icon: <DashboardIcon />,
    path: '/',
  },
  {
    id: 'users',
    text: '用户管理',
    icon: <PeopleIcon />,
    path: '/users',
  },
  {
    id: 'theme-showcace',
    text: '主题使用示例',
    icon: <DisplaySettings />,
    path: '/theme-showcase',
  },
  {
    id: 'i18n',
    text: 'I18n使用示例',
    icon: <DisplaySettings />,
    path: '/i18n-demo',
  },
  {
    id: 'settings',
    text: '一级菜单',
    icon: <SettingsIcon />,
    path: '/settings',
    children: [
      {
        id: 'settings-sub1',
        text: '二级菜单1',
        icon: <MenuOutlined />,
        path: '/settings/sub1',
      },
      {
        id: 'settings-sub2',
        text: '二级菜单2',
        icon: <MenuOutlined />,
        path: '/settings/sub2',
        children: [
          {
            id: 'settings-sub2-grandchild1',
            text: '三级菜单1',
            icon: <MenuOutlined />,
            path: '/settings/sub2/grandchild1',
          },
          {
            id: 'settings-sub2-grandchild2',
            text: '三级菜单2',
            icon: <MenuOutlined />,
            path: '/settings/sub2/grandchild2',
          },
        ],
      },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, mobileOpen, isMobile, onDrawerToggle }) => {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleOpen = (key: string) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMenuClick = (path?: string) => {
    if (path) {
      void navigate(path);
    }
    if (isMobile) {
      onDrawerToggle();
    }
  };

  const drawerContent = (
    <div className="h-full flex flex-col">
      {/* Logo区域 */}
      <div
        className="flex items-center justify-center border-b border-gray-200"
        style={{ height: HEADER_HEIGHT }}
      >
        <h1 className={`font-bold text-xl text-blue-600 ${collapsed ? 'hidden' : 'block'}`}>
          Admin
        </h1>
        {collapsed && <div className="w-8 h-8 bg-blue-600 rounded-full" />}
      </div>

      {/* 菜单列表 */}
      <List className="flex-1 p-2">
        {menuItems.map(item => (
          <MenuItemComponent
            key={item.id}
            item={item}
            collapsed={collapsed}
            openItems={openItems}
            toggleOpen={toggleOpen}
            onMenuClick={handleMenuClick}
          />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* 移动端抽屉 */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        className="md:hidden"
        slotProps={{ paper: { className: 'w-64' } }}
      >
        {drawerContent}
      </Drawer>

      {/* 桌面端抽屉 */}
      <Drawer
        variant="permanent"
        className="hidden md:block"
        slotProps={{
          paper: {
            className: `transition-all duration-200 overflow-visible`,
            sx: { width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH },
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
