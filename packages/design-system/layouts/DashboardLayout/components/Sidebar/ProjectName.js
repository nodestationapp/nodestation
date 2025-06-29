import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Logo from "../../../../components/Logo.js";
import { useAuth } from "@nstation/auth/client/contexts/authMiddleware.js";

const ProjectName = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Logo size={25} borderRadius={1} />
      <Typography color="text.secondary">{user?.project_name}</Typography>
    </Box>
  );
};

export default ProjectName;
