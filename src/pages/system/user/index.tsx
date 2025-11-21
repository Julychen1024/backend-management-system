// pages/users/UserDetail.tsx
import { Box, Typography, Paper } from '@mui/material';

const UserDetail: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" className="font-bold text-gray-900 mb-6">
        用户详情
      </Typography>

      <Paper className="p-4">
        <Typography className="text-gray-500">用户详情内容待开发...</Typography>
      </Paper>
    </Box>
  );
};

export default UserDetail;
