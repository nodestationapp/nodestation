import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";

import MenuContent from "./MenuContent.js";
import OptionsMenu from "./OptionsMenu.js";
import ProjectName from "./ProjectName.js";

import { useAuth } from "@nstation/auth/client/contexts/authMiddleware.js";

const drawerWidth = 255;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { user } = useAuth();

  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [location]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={fullScreen ? "temporary" : "permanent"}
      sx={{
        display: { md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <ProjectName />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MenuContent />
      </Box>
      <Stack
        direction="row"
        sx={{
          px: 1,
          gap: 1,
          height: 35,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Avatar
          sizes="small"
          src={user?.photo?.url}
          sx={{ width: 22, height: 22, borderRadius: 0.5 }}
        />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: 135 }}>
            <Typography
              variant="body2"
              noWrap
              sx={{
                fontWeight: 500,
                lineHeight: "16px",
              }}
            >
              {user?.first_name} {user?.last_name}
            </Typography>
            {/* <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
              noWrap
            >
              {user?.email}
            </Typography> */}
          </Box>
          <OptionsMenu />
        </Box>
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
