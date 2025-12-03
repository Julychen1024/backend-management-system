// src/components/ui/Loading.tsx
import React from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LoadingProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
}

const LoadingContainer = styled(Box, {
  shouldForwardProp: prop => !['fullScreen', 'overlay'].includes(prop as string),
})<{ fullScreen?: boolean; overlay?: boolean }>(({ fullScreen }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  ...(fullScreen && {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }),
  ...(!fullScreen && {
    padding: 40,
  }),
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const Loading: React.FC<LoadingProps> = ({
  size = 40,
  text,
  fullScreen = false,
  overlay = false,
}) => {
  return (
    <Fade in timeout={500}>
      <LoadingContainer fullScreen={fullScreen} overlay={overlay}>
        <StyledCircularProgress size={size} />
        {text && <Typography variant="body2">{text}</Typography>}
      </LoadingContainer>
    </Fade>
  );
};

// 内联加载组件
export const InlineLoading: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Box display="inline-flex" alignItems="center">
    <CircularProgress size={size} />
  </Box>
);

// 骨架屏组件
export const SkeletonLoader: React.FC<{
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  count?: number;
}> = ({ variant = 'text', width, height, count = 1 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Box
      key={index}
      sx={{
        width: width ?? (variant === 'circular' ? 40 : '100%'),
        height: height ?? (variant === 'text' ? 20 : variant === 'circular' ? 40 : 100),
        borderRadius: variant === 'circular' ? '50%' : 1,
        backgroundColor: 'grey.200',
        animation: 'pulse 1.5s ease-in-out infinite',
        '@keyframes pulse': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
        mb: count > 1 && index < count - 1 ? 1 : 0,
      }}
    />
  ));

  return <>{skeletons}</>;
};
