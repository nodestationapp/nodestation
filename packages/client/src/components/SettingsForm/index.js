import "./styles.scss";
import { Divider, Stack, Typography } from "@mui/material";

const SettingsForm = ({ data }) => {
  return (
    <Stack direction="column" gap={4}>
      {data?.map((item, index) => (
        <>
          <Stack key={index} direction="row" gap={8}>
            <Typography sx={{ fontWeight: 500 }}>{item?.label}</Typography>
            {item?.component}
          </Stack>
          <Divider />
        </>
      ))}
    </Stack>
  );
};

export default SettingsForm;
