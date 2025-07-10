import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";

const statusColor = (status) => {
  let color;

  if (status >= 100 && status <= 399) {
    color = "#009E77";
  } else if (status >= 400 && status <= 599) {
    color = "#F93F3E";
  }

  return color;
};

const statusIcon = (status) => {
  switch (status) {
    case "success":
      return (
        <CheckCircleIcon sx={{ height: 21, width: 21, color: "#009E77" }} />
      );
    case "error":
      return <CancelIcon sx={{ height: 21, width: 21, color: "#F93F3E" }} />;
    case "info":
      return <InfoIcon sx={{ height: 21, width: 21, color: "#1191FF" }} />;
    default:
      return (
        <CheckCircleIcon sx={{ height: 21, width: 21, color: "#F93F3E" }} />
      );
  }
};

const EndpointStatus = ({ data }) => {
  const color = statusColor(data?.row?.message?.status);
  const icon = statusIcon(data?.row?.level);

  return data?.row?.message?.status ? (
    <Typography variant="caption" color={color} fontWeight={600} mr={1}>
      {data?.row?.message?.status}
    </Typography>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      {icon}
    </Box>
  );
};

export default EndpointStatus;
