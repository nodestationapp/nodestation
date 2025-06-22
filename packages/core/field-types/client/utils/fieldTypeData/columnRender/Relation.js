import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

const Relation = ({ data, column }) => {
  if (!!!data) return "-";

  return (
    <Stack direction="row" alignItems="center" gap={1} height="100%">
      <LinkOutlinedIcon />
      <Typography sx={{ textDecoration: "underline" }}>
        {data?.[column?.relation?.displayName]}
      </Typography>
    </Stack>
  );
};

export default Relation;
