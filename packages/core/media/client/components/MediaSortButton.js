import { useState } from "react";

import { alpha } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";

import SwapVertIcon from "@mui/icons-material/SwapVert";

import { useUpdateQueryParam } from "@nstation/design-system/hooks";

const options = [
  {
    label: "Newest first",
    value: "created_at:desc",
  },
  {
    label: "Oldest first",
    value: "created_at:asc",
  },
  {
    label: "Largest file size",
    value: "size:desc",
  },
  {
    label: "Smallest file size",
    value: "size:asc",
  },
  {
    label: "Alphabetically (A-Z)",
    value: "name:asc",
  },
  {
    label: "Alphabetically (Z-A)",
    value: "name:desc",
  },
];

const MediaSortButton = ({ sort, setSort }) => {
  const updateQueryParam = useUpdateQueryParam();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuItemClick = (value) => {
    const sortValue = value === "created_at:desc" ? undefined : value;

    if (!!setSort) {
      setSort(sortValue);
    } else {
      updateQueryParam("sort", sortValue);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="micro"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={(theme) => ({
          backgroundColor:
            sort !== "created_at:desc"
              ? `${alpha(theme.palette.primary.main, 0.2)} !important`
              : undefined,
        })}
      >
        <SwapVertIcon
          sx={(theme) => ({
            color:
              sort !== "created_at:desc"
                ? theme.palette.primary.main
                : undefined,
          })}
        />
      </IconButton>
      <Menu
        id="lock-menu"
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          list: {
            "aria-labelledby": "lock-button",
            role: "listbox",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sort}
            onClick={() => handleMenuItemClick(option.value)}
          >
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MediaSortButton;
