import { useLocation, Link } from "react-router-dom";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import { IconifyIcon } from "@nstation/design-system";

const ListItemComponent = ({ item }) => {
  const { pathname } = useLocation();
  const isActive = pathname === item?.to || pathname.startsWith(`${item?.to}/`);

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton to={item.to} LinkComponent={Link} selected={isActive}>
        <ListItemIcon>
          <IconifyIcon icon={item?.icon} />
        </ListItemIcon>
        <ListItemText primary={item.label} />
      </ListItemButton>
    </ListItem>
  );
};

export default ListItemComponent;
