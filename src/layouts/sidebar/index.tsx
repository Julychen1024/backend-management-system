// src/components/layout/Sidebar/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper,
  Popper,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ExpandMore,
  ChevronRight,
  MenuOutlined,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router';
import { HEADER_HEIGHT, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '../config';

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
  onCollapseToggle: () => void;
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

// 自定义Hook：检查路由匹配
const useRouteMatch = (path?: string) => {
  const location = useLocation();
  if (!path) return false;
  return location.pathname === path || location.pathname.startsWith(`${path}/`);
};

// 检查是否有活跃子菜单
const hasActiveChild = (items: MenuItem[], currentPath: string): boolean => {
  return items.some(child => {
    if (child.path && (currentPath === child.path || currentPath.startsWith(`${child.path}/`))) {
      return true;
    }
    return child.children ? hasActiveChild(child.children, currentPath) : false;
  });
};

// 子菜单弹出组件
const SubMenuPopper: React.FC<{
  item: MenuItem;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onMenuClick: (path?: string) => void;
}> = ({ item, anchorEl, open, onClose, onMenuClick }) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const [subMenuHovered, setSubMenuHovered] = useState<string | null>(null);

  // 鼠标离开处理
  useEffect(() => {
    const currentPopperRef = popperRef.current; // 创建局部变量保存 ref 当前值

    const handleMouseLeave = (event: MouseEvent) => {
      if (
        currentPopperRef &&
        !currentPopperRef.contains(event.relatedTarget as Node) &&
        anchorEl &&
        !anchorEl.contains(event.relatedTarget as Node)
      ) {
        onClose();
      }
    };

    if (open && currentPopperRef) {
      currentPopperRef.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (currentPopperRef) {
        currentPopperRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [open, anchorEl, onClose]);

  if (!item.children || item.children.length === 0) return null;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="right-start"
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 0],
          },
        },
      ]}
      style={{ zIndex: 1300 }}
    >
      <Paper ref={popperRef} className="min-w-48 shadow-lg border border-gray-200">
        <List component="div" disablePadding>
          {item.children.map(child => (
            <SubMenuItem
              key={child.id}
              item={child}
              onMenuClick={onMenuClick}
              parentHovered={subMenuHovered}
              onSubMenuHover={setSubMenuHovered}
            />
          ))}
        </List>
      </Paper>
    </Popper>
  );
};

// 子菜单项组件
// 子菜单项组件
const SubMenuItem: React.FC<{
  item: MenuItem;
  onMenuClick: (path?: string) => void;
  parentHovered: string | null;
  onSubMenuHover: (id: string | null) => void;
}> = ({ item, onMenuClick, parentHovered, onSubMenuHover }) => {
  const location = useLocation();
  const anchorRef = useRef<HTMLDivElement>(null);
  const isActive = useRouteMatch(item.path);
  const activeChild = item.children ? hasActiveChild(item.children, location.pathname) : false;
  const isHighlight = isActive || activeChild;
  const hasChildren = item.children && item.children.length > 0;
  const isHovered = parentHovered === item.id;

  const handleMouseEnter = () => {
    if (hasChildren) {
      onSubMenuHover(item.id);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as Node;
    if (anchorRef.current && !anchorRef.current.contains(relatedTarget)) {
      onSubMenuHover(null);
    }
  };

  const handleClick = () => {
    // 只有没有子菜单的项才跳转
    if (!item.children || item.children.length === 0) {
      if (item.path) {
        onMenuClick(item.path);
      }
    }
    // 有子菜单的项点击不跳转，只显示悬浮菜单
  };

  return (
    <div
      ref={anchorRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ListItemButton
        selected={isHighlight}
        className={`rounded-lg mb-1 ${
          isHighlight ? '!bg-blue-50 !text-blue-600' : '!text-gray-600 hover:!bg-gray-100'
        }`}
        onClick={handleClick}
        style={{ paddingLeft: '16px' }}
      >
        {item.icon && (
          <ListItemIcon className={isHighlight ? '!text-blue-600' : '!text-gray-400'}>
            {item.icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={item.text}
          slotProps={{
            primary: {
              className: isHighlight ? 'font-semibold' : 'font-normal',
            },
          }}
        />
        {hasChildren && <ChevronRight className="text-gray-400" />}
      </ListItemButton>

      {/* 三级菜单悬浮 */}
      {hasChildren && isHovered && (
        <SubMenuPopper
          item={item}
          anchorEl={anchorRef.current}
          open={true}
          onClose={() => onSubMenuHover(null)}
          onMenuClick={onMenuClick}
        />
      )}
    </div>
  );
};

const MenuItemComponent: React.FC<{
  item: MenuItem;
  collapsed: boolean;
  level?: number;
  openItems?: Record<string, boolean>;
  toggleOpen?: (key: string) => void;
  onMenuClick: (path?: string) => void;
}> = ({
  item,
  collapsed,
  level = 0,
  openItems = {},
  toggleOpen = () => undefined,
  onMenuClick,
}) => {
  const location = useLocation();
  const [hovered, setHovered] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const key = item.id;
  const isOpen = !!openItems[key];
  const isActive = useRouteMatch(item.path);
  const activeChild = item.children ? hasActiveChild(item.children, location.pathname) : false;
  const isHighlight = isActive || activeChild;
  const showHoverMenu = collapsed && level === 0 && item.children;

  const handleClick = () => {
    // 只有没有子菜单的项才跳转
    if (!item.children || item.children.length === 0) {
      if (item.path) {
        onMenuClick(item.path);
      }
    } else {
      // 有子菜单的项，在非折叠状态下切换展开状态
      if (!collapsed) {
        toggleOpen(key);
      }
      // 折叠状态下，有子菜单的项点击不跳转，只显示悬浮菜单
    }
  };

  const handleMouseEnter = () => {
    if (showHoverMenu) {
      setHovered(true);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as Node;
    if (anchorRef.current && !anchorRef.current.contains(relatedTarget)) {
      setHovered(false);
    }
  };

  return (
    <div
      ref={anchorRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <ListItemButton
        selected={isHighlight}
        className={`rounded-lg mb-1 ${
          isHighlight ? '!bg-blue-50 !text-blue-600' : '!text-gray-600 hover:!bg-gray-100'
        }`}
        onClick={handleClick}
        style={{ paddingLeft: `${16 + level * 16}px` }}
      >
        {item.icon && (
          <ListItemIcon className={isHighlight ? '!text-blue-600' : '!text-gray-400'}>
            {item.icon}
          </ListItemIcon>
        )}
        {(!collapsed || level > 0) && (
          <>
            <ListItemText
              primary={item.text}
              slotProps={{
                primary: {
                  className: isHighlight ? 'font-semibold' : 'font-normal',
                },
              }}
            />
            {item.children && !collapsed && <>{isOpen ? <ExpandMore /> : <ChevronRight />}</>}
          </>
        )}
      </ListItemButton>

      {/* 一级菜单悬浮子菜单 */}
      {showHoverMenu && (
        <SubMenuPopper
          item={item}
          anchorEl={anchorRef.current}
          open={hovered}
          onClose={() => setHovered(false)}
          onMenuClick={onMenuClick}
        />
      )}

      {/* 正常展开的子菜单（非折叠状态） */}
      {item.children && !collapsed && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map(child => (
              <MenuItemComponent
                key={child.id}
                item={child}
                collapsed={collapsed}
                level={level + 1}
                openItems={openItems}
                toggleOpen={toggleOpen}
                onMenuClick={onMenuClick}
              />
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

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
