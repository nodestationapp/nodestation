import Typography from "@mui/material/Typography";

const statusColor = (status) => {
  let color;

  if (status >= 100 && status <= 399) {
    color = "#009E77";
  } else if (status >= 400 && status <= 599) {
    color = "#F93F3E";
  }

  return color;
};

const EndpointStatus = ({ data }) => {
  const status_color = statusColor(data);

  return (
    <Typography variant="caption" color={status_color} fontWeight={600} mr={1}>
      {data}
    </Typography>
  );
};

export default EndpointStatus;
