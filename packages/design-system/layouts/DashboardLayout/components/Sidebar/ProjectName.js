import Box from "@mui/material/Box";
import MuiAvatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

import { useAuth } from "@nstation/core/auth/client/contexts/authMiddleware.js";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ProjectName = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar alt="Sitemark web">
        <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
      </Avatar>
      <Typography color="text.secondary">{user?.project_name}</Typography>
    </Box>
  );
};

export default ProjectName;
