import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { useSlot } from "contexts/slots.js";

const Bottom = () => {
  const actionSlot = useSlot("footer.main");

  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        left: 254,
        right: 0,
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
          justifyContent: "flex-end",
        }}
        spacing={2}
      >
        {actionSlot.map((item) => item())}
      </Stack>
    </Box>
  );
};

export default Bottom;
