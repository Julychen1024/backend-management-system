// src/pages/error/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Typography, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const Error404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Box className="text-center">
        <Typography variant="h1" className="font-bold text-gray-400 mb-4">
          404
        </Typography>
        <Typography variant="h4" className="font-semibold text-gray-600 mb-2">
          页面未找到
        </Typography>
        <Typography variant="body1" className="text-gray-500 mb-8">
          抱歉，您访问的页面不存在。
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => void navigate('/')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          返回首页
        </Button>
      </Box>
    </div>
  );
};

export default Error404;
