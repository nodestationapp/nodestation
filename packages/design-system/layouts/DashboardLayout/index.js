import { useState } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";

import Header from "./components/Header/index.js";
import Sidebar from "./components/Sidebar/index.js";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          overflow: "hidden",
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
        })}
      >
        <Stack
          spacing={2}
          sx={{
            height: "100%",
            alignItems: "center",
            pb: 3,
            mx: { xs: 2, md: 3 },
          }}
        >
          <Header onSidebarOpen={() => setSidebarOpen(true)} />
          <Box
            sx={{
              width: "100%",
              flex: 1,
              maxWidth: { sm: "100%", md: "1700px" },
            }}
          >
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
