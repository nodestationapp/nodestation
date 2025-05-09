import { useState } from "react";
import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Add from "@mui/icons-material/Add";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Button, IconButton, Popover, Stack, Tab, Tabs } from "@mui/material";

import api from "libs/api";
import { useTable } from "@nstation/core/tables/client/contexts/table.js";

const ToolbarTabs = ({ tabs }) => {
  const navigate = useNavigate();

  const { data, view } = useTable();
  const queryClient = useQueryClient();
  const { pathname, search } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onAddView = async (values) => {
    try {
      let create;

      if (!!!values?.id) {
        create = await api.post("/preferences/create", {
          name: values?.name,
          table: data?.table?.id,
          view,
        });

        navigate(`${pathname}?v=${create?.id}`);
      } else {
        await api.put(`/admin/api/preferences/${values?.id}`, {
          name: values?.name,
        });
      }

      setAnchorEl(null);
      queryClient.refetchQueries("tables");
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

  const onDeleteView = async () => {
    try {
      const lastView = data?.views?.[data?.views?.length - 2]?.id;

      setDeleteLoading(true);
      await api.delete(`/preferences/${view}`);

      setAnchorEl(null);
      queryClient.refetchQueries("tables");
      navigate(`${pathname}?v=${lastView}`);
    } catch (err) {
      console.error(err);
    }

    setDeleteLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      name: "",
    },
    onSubmit: onAddView,
  });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const currentPath = `${pathname}${search}`;

  return (
    <Stack direction="row" gap={0.5} alignItems="center">
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={currentPath}
        sx={{ display: "flex", gap: 2 }}
      >
        {tabs.map((item) => (
          <Tab
            key={item.href}
            value={item.href}
            label={item.title}
            onClick={(e) =>
              currentPath === item.href
                ? onViewPopover(e.currentTarget, item.title, view)
                : {}
            }
            to={currentPath === item.href ? undefined : item.href}
            LinkComponent={currentPath === item.href ? "button" : Link}
          />
        ))}
      </Tabs>
      <IconButton
        size="micro"
        aria-describedby={id}
        onClick={(e) => onViewPopover(e.currentTarget, "")}
      >
        <Add />
      </IconButton>
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
            disabled={!!deleteLoading}
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
            disabled={!formik?.dirty || !!deleteLoading}
            loading={formik?.isSubmitting}
          >
            {!!formik?.values?.id ? "Update" : "Create"}
          </Button>
          {!!formik?.values?.id && data?.views?.length > 1 && (
            <IconButton
              size="micro"
              onClick={onDeleteView}
              loading={!!deleteLoading}
            >
              {!!!deleteLoading ? (
                <DeleteOutline sx={{ color: "error.light" }} />
              ) : null}
            </IconButton>
          )}
        </Stack>
      </Popover>
    </Stack>
  );
};

export default ToolbarTabs;
