import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ListItemComponent from "./ListItemComponent.js";

import { api } from "@nstation/design-system/utils";

import AddIcon from "@mui/icons-material/Add";

const TablesList = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const queryClient = useQueryClient();

  const { data: tables, refetch: tablesRefetch } = useQuery({
    queryKey: ["tables"],
    queryFn: () => api.get("/tables"),
  });

  const onSubmit = async (values) => {
    try {
      const create = await api.post("/tables", {
        name: values?.name,
      });

      setAnchorEl(null);

      await queryClient.refetchQueries({
        queryKey: ["client_tables_preferences"],
      });
      await tablesRefetch();

      navigate(`/tables/${create?.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const onViewPopover = (target, name, id) => {
    setAnchorEl(target);
    formik.resetForm({
      values: {
        id,
        name,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit,
  });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const tableLinks = !!tables?.length
    ? tables?.map((table) => ({
        ...table,
        icon: "lucide:table",
        label: table?.name,
        to: `/tables/${table?.tableName}`,
      }))
    : [];

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 1.3, pt: 0.5 }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Table
        </Typography>
        {process.env.NODE_ENV === "development" && (
          <IconButton
            size="micro"
            aria-describedby={id}
            onClick={(e) => onViewPopover(e.currentTarget, "")}
          >
            <AddIcon />
          </IconButton>
        )}
      </Stack>
      <List dense sx={{ pt: 0.5 }}>
        {tableLinks.map((item, index) => (
          <ListItemComponent key={index} item={item} />
        ))}
      </List>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          gap={0}
          sx={{ px: 0.5 }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            autoFocus={true}
            // disabled={!!deleteLoading}
            data-1p-ignore
            value={formik.values.name}
            onChange={formik.handleChange}
            style={{
              padding: "0 10px",
              height: "41px",
              width: "120px",
              border: "none",
              outlineWidth: 0,
              backgroundColor: "transparent",
            }}
          />
          <Button
            size="small"
            type="submit"
            disabled={!formik?.dirty}
            loading={formik?.isSubmitting}
          >
            Create
          </Button>
        </Stack>
      </Popover>
    </Stack>
  );
};

export default TablesList;
