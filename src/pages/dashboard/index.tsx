import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
import {
  People as PeopleIcon,
  ShoppingCart as CartIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/stores/auth';

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => (
  <Card sx={{ backgroundColor: 'primary.light' }}>
    <CardContent>
      <Box className="flex items-center justify-between">
        <Box>
          <Typography variant="h6" className="text-gray-600 mb-2">
            {title}
          </Typography>
          <Typography variant="h4" className="font-bold text-gray-800">
            {value}
          </Typography>
        </Box>
        <Box className={`p-3 rounded-full ${color}`}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <Card>
        <CardContent className="pb-4">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="h5" className="font-bold text-gray-800 mb-2">
                欢迎回来，{user?.name}！
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                这是您的管理仪表板，您可以在这里查看系统概览和管理各项功能。
              </Typography>
            </Box>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              退出登录
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 数据统计 */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="总用户数"
            value="1,234"
            icon={<PeopleIcon className="text-white" />}
            color="bg-blue-500"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="今日订单"
            value="56"
            icon={<CartIcon className="text-white" />}
            color="bg-green-500"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="总收入"
            value="¥12,345"
            icon={<MoneyIcon className="text-white" />}
            color="bg-purple-500"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="增长率"
            value="+12.5%"
            icon={<TrendIcon className="text-white" />}
            color="bg-orange-500"
          />
        </Grid>
      </Grid>

      {/* 快速操作 */}
      <Card>
        <CardContent>
          <Typography variant="h6" className="font-bold text-gray-800 mb-4">
            快速操作
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                className="h-16 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              >
                用户管理
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                className="h-16 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              >
                系统设置
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                className="h-16 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              >
                数据报表
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                className="h-16 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              >
                帮助文档
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
