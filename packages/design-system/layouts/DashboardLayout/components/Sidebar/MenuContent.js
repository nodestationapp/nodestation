import * as React from "react";
import { useLocation, Link } from "react-router-dom";

import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

import { IconifyIcon } from "@nstation/design-system";

import { useApp } from "contexts/app.js";

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

const MenuContent = () => {
  const { menuLinks } = useApp();

  const topMenuLinks = menuLinks
    .filter((link) => link.placement !== "bottom")
    ?.sort((a, b) => a.order - b.order);
  const bottomMenuLinks = menuLinks
    .filter((link) => link.placement === "bottom")
    ?.sort((a, b) => a.order - b.order);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {topMenuLinks.map((item, index) => (
          <ListItemComponent key={index} item={item} />
        ))}
      </List>
      <List dense>
        {bottomMenuLinks.map((item, index) => (
          <ListItemComponent key={index} item={item} />
        ))}
      </List>
    </Stack>
  );
};

export default MenuContent;
