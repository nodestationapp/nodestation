import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";

const Media = ({ data }) => {
  if (!!!data) return "-";

  return (
    <Stack direction="row" alignItems="center" gap={1} height="100%">
      <Avatar src={data?.url} sx={{ width: 28, height: 28, borderRadius: 1 }} />
      {/* <Typography>{data?.name}</Typography> */}
    </Stack>
  );
};

export default Media;
