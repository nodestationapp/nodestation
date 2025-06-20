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
    <Box sx={{ display: "flex", width: "100%" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          maxWidth: "100vw",
          overflowX: "auto",
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
            pb: 7,
            mx: { xs: 2, md: 3 },
          }}
        >
          <Header onSidebarOpen={() => setSidebarOpen(true)} />
          <Box
            sx={(theme) => ({
              flex: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: "1700px" },
              height: "100%",
              pb: 3,
              marginTop: "-3px !important",
              pt: theme.spacing(2),
            })}
          >
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
