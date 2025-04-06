import { Box, Divider, Stack, Typography } from "@mui/material";

const SettingsForm = ({ data }) => {
  return (
    <Stack direction="column" gap={4}>
      {data?.map((item, index) => (
        <>
          <Stack key={index} direction="row">
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
