import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Lock as LockIcon, Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * 未授权访问页面组件
 */
const Error403: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    void navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <LockIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
        <Typography variant="h1" color="warning.main" gutterBottom>
          403
        </Typography>
        <Typography variant="h4" gutterBottom>
          访问被拒绝
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          抱歉，您没有权限访问此页面。请联系管理员获取相应权限。
        </Typography>
      </Box>
      <Button variant="contained" startIcon={<HomeIcon />} onClick={handleGoHome} size="large">
        返回首页
      </Button>
    </Container>
  );
};

export default Error403;
