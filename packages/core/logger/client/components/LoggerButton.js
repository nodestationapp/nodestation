import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Box, Card, Divider, IconButton, Typography } from "@mui/material";
import MuiTable from "@nstation/tables/client/components/MuiTable/index.js";
import { api } from "@nstation/design-system/utils";
import tableColumnsRender from "@nstation/tables/client/utils/tableColumnsRender.js";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link } from "react-router-dom";

const mainClass = "logger-main";

const CustomButton = styled(Button)(({ theme }) => ({
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

const columnsToShow = [
  {
    flex: 1,
    slug: "source",
    name: "Source",
    type: "endpoint",
  },
  {
    flex: 1,
    type: "date",
    slug: "created_at",
    name: "Date",
  },
  {
    flex: 1,
    slug: "message",
    name: "Message",
  },
];

const Logger = () => {
  return (
    <CustomButton to="/logger" LinkComponent={Link}>
      <ListOutlinedIcon sx={{ height: 16, width: 16 }} />
      Logs
    </CustomButton>
  );
};

export default Logger;
