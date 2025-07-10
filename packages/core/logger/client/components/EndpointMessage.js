import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const CustomChip = styled(Chip)(({ theme }) => ({
  borderRadius: 4,
  border: "none",
  minWidth: 55,

  ".MuiChip-label": {
    padding: "0 5px",
    color: "#fff",
    fontWeight: 500,
  },
}));

const methodColors = {
  POST: "#009E77",
  GET: "#1191FF",
  PUT: "#E97500",
  DELETE: "#F93F3E",
};

const EndpointMessage = ({ data }) => {
  return data?.row?.message?.url ? (
    <Stack direction="row" alignItems="center" gap={1.5} height="100%">
      <CustomChip
        label={data?.row?.message?.method}
        size="small"
        variant="filled"
        sx={{
          pointerEvents: "none",
          backgroundColor: `${
            methodColors[data?.row?.message?.method]
          } !important`,
        }}
      />
      <Typography variant="body2">{data?.row?.message?.url}</Typography>
    </Stack>
  ) : (
    <Typography
      variant="body2"
      sx={{ height: "100%", display: "flex", alignItems: "center" }}
    >
      <EmailOutlinedIcon sx={{ mr: 1, height: 21, width: 21 }} />
      {data?.row?.message}
    </Typography>
  );
};

export default EndpointMessage;
