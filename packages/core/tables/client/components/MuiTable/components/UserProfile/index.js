import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const UserProfile = ({ data }) => {
  if (!!!data) return "-";

  return (
    <Stack direction="row" alignItems="center" gap={1} height="100%">
      <Avatar
        src={data?.photo?.url}
        sx={{ width: 28, height: 28, objectFit: "cover" }}
      />
      <Typography>{`${data?.first_name} ${data?.last_name}`}</Typography>
    </Stack>
  );
};

export default UserProfile;
