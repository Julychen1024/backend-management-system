import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { routerConfig } from '@/router/route-config';
import { RouterUtils } from '@/utils/router-utils';

/**
 * 页面布局组件
 * 用于需要独立布局的页面，如详情页、表单页等
 */
const PageLayout: React.FC = () => {
  const location = useLocation();

  // 生成面包屑导航
  const breadcrumbs = RouterUtils.generateBreadcrumbs(routerConfig, location.pathname);

  return (
    <Box sx={{ p: 3 }}>
      {/* 面包屑导航 */}
      {breadcrumbs.length > 0 && (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return isLast ? (
              <Typography key={breadcrumb.path} color="text.primary" fontWeight="medium">
                {breadcrumb.title}
              </Typography>
            ) : (
              <Link
                key={breadcrumb.path}
                href={breadcrumb.path}
                color="inherit"
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {breadcrumb.title}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      {/* 页面内容 */}
      <Outlet />
    </Box>
  );
};

export default PageLayout;
