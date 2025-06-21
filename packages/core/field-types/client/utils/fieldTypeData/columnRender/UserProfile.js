import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const UserProfile = ({ data, size = 24 }) => {
  if (!!!data?.id) return "-";

  return (
    <Stack direction="row" alignItems="center" gap={1} height="100%">
      <Avatar
        src={data?.photo?.url}
        sx={{ width: size, height: size, objectFit: "cover" }}
      />
      <Typography>{`${data?.first_name} ${data?.last_name}`}</Typography>
    </Stack>
  );
};

export default UserProfile;
