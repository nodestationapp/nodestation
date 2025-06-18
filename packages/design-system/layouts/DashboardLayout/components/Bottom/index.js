import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

import { useSlot } from "contexts/slots.js";

const CustomButton = styled(Button)(() => ({
  padding: "0 8px",
  height: "100%",
  borderRadius: 0,
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: 13,
  color: "#88fc85 !important",
  flexShrink: 0,
}));

const Bottom = () => {
  const actionSlot = useSlot("footer.main");

  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        right: 0,
        bottom: 0,
        height: 35,
        zIndex: 1000,
        left: { xs: 0, md: 254 },
        width: { xs: "100%", md: "unset" },
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
      >
        {actionSlot?.[0]?.map((item, key) => (
          <CustomButton to={item?.to} LinkComponent={Link} key={key}>
            <item.icon sx={{ height: 16, width: 16 }} />
            {item?.label}
          </CustomButton>
        ))}
      </Stack>
    </Box>
  );
};

export default Bottom;
