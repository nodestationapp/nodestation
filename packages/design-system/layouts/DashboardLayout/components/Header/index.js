import * as React from "react";
import Stack from "@mui/material/Stack";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs.js";
import { ColorModeDropdown } from "@nstation/design-system";

import Search from "./Search.js";
import { Box, Divider } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: { xs: "none", md: "flex" },
          width: "100%",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          pt: 1.3,
          pb: 1.3,
        }}
        spacing={2}
      >
        <NavbarBreadcrumbs />
        <Stack direction="row" sx={{ gap: 1 }}>
          <Search />
          <ColorModeDropdown />
        </Stack>
      </Stack>
      <Divider />
    </Box>
  );
};

export default Header;
