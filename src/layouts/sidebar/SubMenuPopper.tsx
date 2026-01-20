import React, { useState, useRef, useEffect } from 'react';
import { Paper, Popper, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useLocation } from 'react-router';

interface MenuItem {
  id: string;
  text: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
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

// 子菜单弹出组件
export const SubMenuPopper: React.FC<{
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
export const SubMenuItem: React.FC<{
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
        sx={theme => ({
          paddingLeft: '12px',
          backgroundColor: theme.palette.background.paper + ' !important',
          borderRadius: '8px',
          boxShadow: isHighlight
            ? '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06),0 -2px 3px -2px rgba(0, 0, 0, 0.1)'
            : 'none',
        })}
      >
        {item.icon && (
          <ListItemIcon sx={{ color: isHighlight ? 'primary.main' : 'grey.500', minWidth: 40 }}>
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
