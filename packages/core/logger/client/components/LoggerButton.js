import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const CustomButton = styled(Button)(() => ({
  padding: "0 8px",
  height: "100%",
  borderRadius: 0,
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  gap: 5,
  fontSize: 13,
  color: "#88fc85 !important",
  flexShrink: 0,
}));

const Logger = () => {
  return (
    <CustomButton to="/logger" LinkComponent={Link}>
      <ListOutlinedIcon sx={{ height: 16, width: 16 }} />
      Logs
    </CustomButton>
  );
};

export default Logger;
