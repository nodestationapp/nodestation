import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

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

const LoggerTableType = ({ data }) => {
  return (
    <Stack direction="row" alignItems="center" gap={1.5} height="100%">
      <CustomChip
        label={data?.message?.method}
        size="small"
        variant="filled"
        sx={{
          pointerEvents: "none",
          backgroundColor: `${methodColors[data?.message?.method]} !important`,
        }}
      />
      <Typography variant="body2">{data?.message?.url}</Typography>
    </Stack>
  );
};

export default LoggerTableType;
