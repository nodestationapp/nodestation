import IconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const PasswordVisibilityToggle = ({ show, setShow }) => {
  return (
    <IconButton size="micro" onClick={() => setShow((prev) => !prev)}>
      {show ? <VisibilityOffOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
    </IconButton>
  );
};

export default PasswordVisibilityToggle;
