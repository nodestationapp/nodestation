import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useAuth } from "@nstation/auth/client/contexts/authMiddleware.js";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        height: "calc(100vh - 150px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h5">Welcome {user?.first_name} 👋</Typography>
        <Typography variant="body" textAlign="center">
          Get familiar with dashboard, here are some ways to get started.
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Documentation
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
