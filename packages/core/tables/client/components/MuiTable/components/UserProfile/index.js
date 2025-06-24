import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const UserProfile = ({ data, size = 24 }) => {
  return (
    <Stack direction="row" alignItems="center" gap={1} height="100%">
      <Avatar
        src={data?.photo?.url}
        sx={{ width: size, height: size, objectFit: "cover" }}
      />
      <Typography sx={{ whiteSpace: "nowrap" }}>
        {`${data?.first_name} ${data?.last_name}`}
      </Typography>
    </Stack>
  );
};

export default UserProfile;
