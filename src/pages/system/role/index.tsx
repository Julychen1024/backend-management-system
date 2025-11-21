// pages/users/UserList.tsx
import { Box, Typography, Paper } from '@mui/material';

const UserList: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" className="font-bold text-gray-900 mb-6">
        用户列表
      </Typography>

      <Paper className="p-4">
        <Typography className="text-gray-500">用户列表内容待开发...</Typography>
      </Paper>
    </Box>
  );
};

export default UserList;
