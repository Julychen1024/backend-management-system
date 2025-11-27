import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Card, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAuthStore } from '@/stores/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading } = useAuthStore();

  const [formData, setFormData] = React.useState({
    email: 'admin@example.com',
    password: 'password',
  });
  const [error, setError] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // 清除错误信息
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('请输入邮箱和密码');
      return;
    }

    try {
      await login(formData.email, formData.password);

      // 登录成功，重定向到目标页面或首页
      const redirect = searchParams.get('redirect') ?? '/';
      void navigate(redirect, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <Box className="text-center mb-8">
          <Typography variant="h4" className="font-bold text-gray-800 mb-2">
            欢迎回来
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            请输入您的账号信息
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={e => void handleSubmit(e)}>
          <TextField
            fullWidth
            label="邮箱地址"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="!mb-4"
            disabled={isLoading}
            required
          />

          <TextField
            fullWidth
            label="密码"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="!mb-6"
            disabled={isLoading}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 py-3"
          >
            {isLoading ? '登录中...' : '登录'}
          </Button>
        </form>

        <Box className="mt-6 text-center">
          <Typography variant="body2" className="text-gray-500">
            测试账号: admin@example.com / password
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default Login;
