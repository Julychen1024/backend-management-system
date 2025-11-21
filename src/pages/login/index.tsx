import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useAuthStore } from '@/stores/auth-store';

/**
 * 登录页面
 */
const Login: React.FC = () => {
  const { login } = useAuthStore();

  const handleLogin = async () => {
    await login({
      username: 'admin',
      password: 'password',
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="grey.100"
    >
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          系统登录
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
          请输入您的账号和密码
        </Typography>
        <Button fullWidth variant="contained" size="large" onClick={() => void handleLogin()}>
          模拟登录
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
