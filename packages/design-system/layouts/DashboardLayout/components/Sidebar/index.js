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

const drawerWidth = 270;

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
          p: 1.75,
          pb: 1,
        }}
      >
        <ProjectName />
      </Box>
      {/* <Divider /> */}
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
    </Drawer>
  );
};

export default Sidebar;
