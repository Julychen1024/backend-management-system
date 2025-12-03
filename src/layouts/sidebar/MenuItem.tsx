import React, { useState, useRef } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import { useLocation } from 'react-router';
import { SubMenuPopper } from './SubMenuPopper';

interface MenuItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

interface MenuItemComponentProps {
  item: MenuItem;
  collapsed: boolean;
  level?: number;
  openItems?: Record<string, boolean>;
  toggleOpen?: (key: string) => void;
  onMenuClick: (path?: string) => void;
}

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

export const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
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
        className="rounded-lg mb-1"
        onClick={handleClick}
        style={{ paddingLeft: `${12 + level * 12}px` }}
      >
        {item.icon && (
          <ListItemIcon sx={{ color: isHighlight ? 'primary.main' : 'grey.500', minWidth: 40 }}>
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
