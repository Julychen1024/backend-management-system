import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

/**
 * 路由级错误边界组件
 * 捕获并显示路由级别的错误
 */
const ErrorBoundary: React.FC<ErrorBoundaryProps> = () => {
  const error = useRouteError();

  // 如果是路由错误响应
  if (isRouteErrorResponse(error)) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h1" color="error" gutterBottom>
            {error.status}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {error.statusText}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {error.data ?? '抱歉，页面出现了问题'}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<HomeIcon />} href="/">
          返回首页
        </Button>
      </Container>
    );
  }

  // 其他类型的错误
  const errorMessage = error instanceof Error ? error.message : '未知错误';

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" color="error" gutterBottom>
          出错了
        </Typography>
        <Typography variant="h6" gutterBottom>
          应用程序遇到了意外错误
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: 'grey.50',
            borderRadius: 1,
            fontFamily: 'monospace',
          }}
        >
          {errorMessage}
        </Typography>
      </Box>
      <Button variant="contained" startIcon={<HomeIcon />} href="/">
        返回首页
      </Button>
    </Container>
  );
};

export default ErrorBoundary;
