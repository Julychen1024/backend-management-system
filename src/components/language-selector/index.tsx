// src/components/ui/LanguageSelector.tsx
import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Avatar,
  Fade,
} from '@mui/material';
import { useI18nStore } from '@/stores/i18n';
import { useTranslation } from 'react-i18next';

// 语言配置（与MUI locale 对应）
const LANGUAGES = [
  {
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳',
    muiLocale: 'zhCN',
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    muiLocale: 'enUS',
  },
  {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    muiLocale: 'viVN',
  },
] as const;

export const LanguageSelector: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({
  size = 'small',
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { language, changeLanguage } = useI18nStore();
  const { t } = useTranslation('common');

  const currentLang = LANGUAGES.find(lang => lang.code === language) ?? LANGUAGES[0];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = async (code: string) => {
    handleClose();
    await changeLanguage(code);
  };

  return (
    <>
      <Tooltip title={t('language.switch')}>
        <IconButton size={size} onClick={handleClick}>
          <Avatar className="flex item-center justify-center">{currentLang.flag}</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: { minWidth: 200 },
        }}
      >
        {LANGUAGES.map(lang => (
          <MenuItem
            key={lang.code}
            selected={lang.code === language}
            onClick={() => void handleLanguageChange(lang.code)}
          >
            <ListItemIcon>
              <Avatar sx={{ width: 24, height: 24, fontSize: 14 }}>{lang.flag}</Avatar>
            </ListItemIcon>
            <ListItemText primary={lang.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
