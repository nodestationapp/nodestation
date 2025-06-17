import { Stack, Typography } from "@mui/material";

const Endpoint = ({ data }) => {
  return (
    <Stack direction="row" alignItems="center" sx={{ height: "100%" }} gap={1}>
      <Typography variant="body2">{data?.url}</Typography>
    </Stack>
  );
};

export default Endpoint;
