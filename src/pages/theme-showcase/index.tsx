// src/pages/theme-showcase/index.tsx
import React from 'react';
import { Box, Grid, Typography, Divider, Card, Button, Container } from '@mui/material';
import { ThemeToggle } from '@/components/theme-toggle';
import { Loading } from '@/components/loading';

const ThemeShowcase: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 页面标题 */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" fontWeight={700}>
            主题系统展示
          </Typography>
          <ThemeToggle size="large" />
        </Box>
        <Typography variant="body1" color="text.secondary">
          展示当前主题系统的所有组件和样式
        </Typography>
      </Box>

      {/* 按钮展示 */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          按钮组件
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid>
            <Button variant="contained" color="primary">
              Primary
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="info">
              Info
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="success">
              Success
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="warning">
              Warning
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="error">
              Error
            </Button>
          </Grid>
          <Grid>
            <Button variant="outlined" color="primary">
              Primary
            </Button>
          </Grid>
          <Grid>
            <Button variant="outlined" color="secondary">
              Secondary
            </Button>
          </Grid>
          <Grid>
            <Button variant="outlined" color="info">
              Info
            </Button>
          </Grid>
          <Grid>
            <Button variant="outlined" color="success">
              Success
            </Button>
          </Grid>
          <Grid>
            <Button variant="outlined" color="warning">
              Warning
            </Button>
          </Grid>
          <Grid>
            <Button variant="outlined" color="error">
              Error
            </Button>
          </Grid>
          <Grid>
            <Button variant="text" color="primary">
              Primary
            </Button>
          </Grid>
          <Grid>
            <Button variant="text" color="secondary">
              Secondary
            </Button>
          </Grid>
          <Grid>
            <Button variant="text" color="info">
              Info
            </Button>
          </Grid>
          <Grid>
            <Button variant="text" color="success">
              Success
            </Button>
          </Grid>
          <Grid>
            <Button variant="text" color="warning">
              Warning
            </Button>
          </Grid>
          <Grid>
            <Button variant="text" color="error">
              Error
            </Button>
          </Grid>
          <Grid>
            <Button loading>加载中</Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 加载状态展示 */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          加载状态
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card title="内联加载" variant="outlined">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2">正在加载数据...</Typography>
                <Loading size={20} />
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card title="带文字加载" variant="outlined">
              <Loading text="正在处理..." />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ThemeShowcase;
