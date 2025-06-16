import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs.js";
import { ColorModeDropdown } from "@nstation/design-system";
import { IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

// import Search from "./Search.js";

const Bottom = ({ onSidebarOpen }) => {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        position: "fixed",
        left: 254,
        bottom: 0,
        height: 35,
        zIndex: 1000,
        left: { sm: 0, md: 254 },
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
          : alpha(theme.palette.background.default, 1),
      })}
    >
      <Divider />
      <Stack
        direction="row"
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        spacing={2}
      ></Stack>
    </Box>
  );
};

export default Bottom;
