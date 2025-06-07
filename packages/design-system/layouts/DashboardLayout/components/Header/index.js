import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs.js";
import { ColorModeDropdown } from "@nstation/design-system";
import { IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

// import Search from "./Search.js";

const Header = ({ onSidebarOpen }) => {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
          : alpha(theme.palette.background.default, 1),
      })}
    >
      <Stack
        direction="row"
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          pt: 1.3,
          pb: 1.3,
        }}
        spacing={2}
      >
        <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
          <IconButton size="micro" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
          <NavbarBreadcrumbs />
        </Stack>
        <Stack direction="row" sx={{ gap: 1 }}>
          <ColorModeDropdown />
        </Stack>
      </Stack>
      <Divider />
    </Box>
  );
};

export default Header;
