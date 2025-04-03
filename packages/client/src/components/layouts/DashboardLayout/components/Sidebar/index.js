import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import { Avatar, Divider, Stack, Typography, Box } from "@mui/material";

import MenuContent from "./MenuContent.js";
import OptionsMenu from "./OptionsMenu.js";
import ProjectName from "./ProjectName.js";

import { useApp } from "context/app";

const drawerWidth = 240;

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

const Sidebar = () => {
  const { user } = useApp();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
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
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Avatar
          sizes="small"
          alt={`${user?.first_name} ${user?.last_name}`}
          src={user?.photo?.url}
          sx={{ width: 36, height: 36 }}
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
            <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
              noWrap
            >
              {user?.email}
            </Typography>
          </Box>
          <OptionsMenu />
        </Box>
      </Stack>
    </Drawer>
  );
};

export default Sidebar;
