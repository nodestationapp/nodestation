import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import OptionsMenu from "./OptionsMenu.js";

import Logo from "../../../../components/Logo.js";

import { useApp } from "@nstation/client/src/contexts/app.js";

const ProjectName = () => {
  const { site } = useApp();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        gap: 1,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Logo size={25} borderRadius={1} />
        <Typography fontSize={13} fontWeight={600}>
          {site?.title || "Nodestation"}
        </Typography>
      </Stack>
      <OptionsMenu />
    </Box>
  );
};

export default ProjectName;
