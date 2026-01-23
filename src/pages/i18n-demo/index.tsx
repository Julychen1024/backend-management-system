// src/pages/i18n-demo/index.tsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  Divider,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/language-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { Trans } from 'react-i18next';

export const I18nDemo: React.FC = () => {
  const { t, i18n } = useTranslation(['common', 'demo']);

  const [name, setName] = useState('');
  const [itemCount, setItemCount] = useState(0);

  // 演示插值
  const greetingText = name || t('common:guest');
  const greeting = t('demo:greeting', { name: greetingText });

  // 演示复数
  const itemText = t('demo:itemCount', { num: itemCount });

  // 演示日期格式化
  const formattedDate = t('demo:currentDate', {
    date: new Date().toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 头部控制栏 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {t('demo:title')}
        </Typography>
        <Stack direction="row" spacing={2}>
          <LanguageSelector size="medium" />
          <ThemeToggle size="medium" />
        </Stack>
      </Box>

      {/* 基础翻译示例 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('demo:sections.basic')}
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            {greeting}
          </Alert>
          <TextField
            label={t('common:name')}
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </CardContent>
      </Card>

      {/* 插值与复数 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('demo:sections.advanced')}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Button variant="outlined" onClick={() => setItemCount(Math.max(0, itemCount - 1))}>
              {t('common:decrease')}
            </Button>
            <Typography sx={{ mx: 3, display: 'inline' }}>{itemText}</Typography>
            <Button variant="outlined" onClick={() => setItemCount(itemCount + 1)}>
              {t('common:increase')}
            </Button>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
        </CardContent>
      </Card>

      {/* 富文本与JSX混排 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('demo:sections.jsx')}
          </Typography>
          <Typography>
            <Trans
              i18nKey="demo:jsx.example"
              values={{ product: 'Vite + React' }}
              components={{
                strong: <strong style={{ color: 'primary.main' }} />,
                code: (
                  <code
                    style={{ backgroundColor: 'action.hover', padding: '2px 4px', borderRadius: 4 }}
                  />
                ),
              }}
            />
          </Typography>
        </CardContent>
      </Card>

      {/* MUI 组件多语言验证 */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('demo:sections.mui')}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">{t('common:submit')}</Button>
            <Button variant="outlined">{t('common:cancel')}</Button>
            <Button variant="text">{t('common:reset')}</Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
            {t('demo:mui.hint')}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default I18nDemo;
