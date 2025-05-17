import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import TablesList from "./TablesList.js";
import ListItemComponent from "./ListItemComponent.js";

import { useApp } from "contexts/app.js";

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
      <Stack>
        <List dense>
          {topMenuLinks.map((item, index) => (
            <ListItemComponent key={index} item={item} />
          ))}
        </List>
        <Divider />
        <TablesList />
      </Stack>
      <List dense>
        {bottomMenuLinks.map((item, index) => (
          <ListItemComponent key={index} item={item} />
        ))}
      </List>
    </Stack>
  );
};

export default MenuContent;
