import { Avatar, Stack, Typography } from "@mui/material";

const Media = ({ data }) => {
  if (!!!data) return "-";

  return (
    <Stack direction="row" alignItems="center" gap={1} height="100%">
      <Avatar src={data?.url} sx={{ width: 28, height: 28, borderRadius: 1 }} />
      <Typography>{data?.name}</Typography>
    </Stack>
  );
};

export default Media;
