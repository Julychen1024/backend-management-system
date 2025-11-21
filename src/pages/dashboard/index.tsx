import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

/**
 * 数据看板页面
 */
const Dashboard: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        数据看板
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">欢迎使用后台管理系统！这里是数据看板页面。</Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
