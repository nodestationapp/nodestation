import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

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

const EndpointMethod = ({ data }) => {
  return (
    <CustomChip
      label={data}
      size="small"
      variant="filled"
      sx={{ backgroundColor: `${methodColors[data]} !important` }}
    />
  );
};

export default EndpointMethod;
