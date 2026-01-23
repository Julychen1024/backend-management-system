import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Card, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAuthStore } from '@/stores/auth';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading } = useAuthStore();

  // 显式声明命名空间（可选，主要用于类型推断）
  const { t } = useTranslation(['common', 'login']);

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
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError(t('login:error.required')); // 显式命名空间
      return;
    }

    try {
      await login(formData.email, formData.password);
      const redirect = searchParams.get('redirect') ?? '/';
      void navigate(redirect, { replace: true });
    } catch (_err) {
      setError(t('login:error.failed')); // 显式命名空间
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <Box className="text-center mb-8">
          <Typography variant="h4" className="font-bold text-gray-800 mb-2">
            {t('login:title')} {/* 明确指定 login 命名空间 */}
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            {t('login:subtitle')}
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
            label={t('login:form.email')} // 显式前缀
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
            label={t('login:form.password')} // 显式前缀
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
            {isLoading ? t('common:loading') : t('login:submit')}
          </Button>
        </form>

        <Box className="mt-6 text-center">
          <Typography variant="body2" className="text-gray-500">
            {t('login:hint')}
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default Login;
