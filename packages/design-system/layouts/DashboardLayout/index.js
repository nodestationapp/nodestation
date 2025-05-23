import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";

import Header from "./components/Header/index.js";
import Sidebar from "./components/Sidebar/index.js";

const DashboardLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Sidebar />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: "auto",
        })}
      >
        <Stack
          spacing={2}
          sx={{
            height: "100%",
            alignItems: "center",
            mx: 3,
            pb: 3,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header />
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
