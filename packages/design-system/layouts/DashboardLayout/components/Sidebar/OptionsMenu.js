import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import MuiMenuItem from "@mui/material/MenuItem";
import { listClasses } from "@mui/material/List";
import { paperClasses } from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import Divider, { dividerClasses } from "@mui/material/Divider";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import { useAuth } from "@nstation/auth/client/contexts/authMiddleware.js";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { IconButton } from "@mui/material";

const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});

export default function OptionsMenu() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="micro"
        aria-label="Open menu"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: "4px",
            width: 150,
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: "4px -4px",
          },
        }}
      >
        <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: "auto",
              minWidth: 0,
            },
          }}
        >
          <ListItemText onClick={handleLogout}>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
}
