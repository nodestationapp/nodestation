import Typography from "@mui/material/Typography";
import { IconifyIcon } from "@nstation/design-system";

const EmailTableType = ({ data }) => {
  const label =
    data?.label ??
    (data?.message !== null && typeof data?.message !== "object"
      ? data.message
      : "-");

  return (
    <Typography
      variant="body2"
      sx={{ height: "100%", display: "flex", alignItems: "center", gap: 1 }}
    >
      <IconifyIcon icon="lucide:send-horizontal" />
      {label}
    </Typography>
  );
};

export default EmailTableType;
