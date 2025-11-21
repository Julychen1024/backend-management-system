import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Home as HomeIcon, SearchOff as SearchOffIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * 404 页面未找到组件
 */
const Error404: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    void navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h1" color="text.secondary" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          页面未找到
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          抱歉，您访问的页面不存在。请检查URL是否正确，或返回首页。
        </Typography>
      </Box>
      <Button variant="contained" startIcon={<HomeIcon />} onClick={handleGoHome} size="large">
        返回首页
      </Button>
    </Container>
  );
};

export default Error404;
