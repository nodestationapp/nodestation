import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

const Relation = ({ data, column }) => {
  if (!!!data) return "-";

  return (
    <Stack direction="row" alignItems="center" gap={2} height="100%">
      {data?.map((item, index) => (
        <Stack key={index} direction="row" alignItems="center" gap={1}>
          <LinkOutlinedIcon />
          <Typography sx={{ textDecoration: "underline" }}>
            {item?.[column?.relation?.displayName]}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default Relation;
