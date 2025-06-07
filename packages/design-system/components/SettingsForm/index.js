import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const SettingsForm = ({ data }) => {
  return (
    <Stack direction="column" gap={4}>
      {data?.map((item, index) => (
        <>
          <Stack
            key={index}
            direction={{ sx: "column", md: "row" }}
            sx={{
              gap: {
                xs: 2,
                md: 0,
              },
            }}
          >
            <Typography sx={{ fontWeight: 500, minWidth: 180 }}>
              {item?.label}
            </Typography>
            <Box sx={{ flex: 1 }}>{item?.component}</Box>
          </Stack>
          <Divider />
        </>
      ))}
    </Stack>
  );
};

export default SettingsForm;
