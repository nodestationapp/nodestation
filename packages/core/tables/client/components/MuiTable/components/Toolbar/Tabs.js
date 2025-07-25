import { useState } from "react";
import { useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";

import { api } from "@nstation/design-system/utils";
import { useTable } from "@nstation/tables/client/contexts/table.js";

import Add from "@mui/icons-material/Add";
import ArrowBack from "@mui/icons-material/ArrowBack";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

const ToolbarTabs = ({ tabs, noAddTab, backButtonLink }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const table = useTable();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onAddView = async (values) => {
    try {
      let create;

      if (!!!values?.id) {
        create = await api.post("/admin-api/preferences/create", {
          name: values?.name,
          table: table?.id,
          view: table?.preferences?.id,
        });

        await queryClient.refetchQueries("tables");

        navigate(`${pathname}?v=${create?.id}`);
      } else {
        await api.put(`/admin-api/preferences/${values?.id}`, {
          name: values?.name,
        });

        await queryClient.refetchQueries("tables");
      }

      setAnchorEl(null);
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
      const lastView = table?.views?.[table?.views?.length - 2]?.id;

      setDeleteLoading(true);
      await api.delete(`/admin-api/preferences/${table?.preferences?.id}`);

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

  const default_view = tabs?.find((item) => item?.last_viewed);

  const currentPath = !!searchParams?.get("v")
    ? `${pathname}?v=${searchParams?.get("v")}`
    : default_view?.href || pathname;

  return (
    <Stack direction="row" gap={0.5} alignItems="center">
      {!!backButtonLink && (
        <IconButton size="micro" onClick={() => navigate(backButtonLink)}>
          <ArrowBack />
        </IconButton>
      )}
      {!!!tabs?.length ? (
        <Stack direction="row" gap={0.5}>
          <Skeleton
            variant="rectangular"
            width={70}
            height={31}
            sx={{ borderRadius: 0.8 }}
          />
        </Stack>
      ) : (
        <>
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
                onClick={
                  !!!noAddTab
                    ? (e) =>
                        currentPath === item.href
                          ? onViewPopover(
                              e.currentTarget,
                              item.title,
                              table?.preferences?.id
                            )
                          : {}
                    : () => {}
                }
                to={currentPath === item.href ? undefined : item.href}
                LinkComponent={currentPath === item.href ? "button" : Link}
              />
            ))}
          </Tabs>
          {!!!noAddTab && (
            <IconButton
              size="micro"
              aria-describedby={id}
              onClick={(e) => onViewPopover(e.currentTarget, "")}
            >
              <Add />
            </IconButton>
          )}
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
              {!!formik?.values?.id && table?.views?.length > 1 && (
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
        </>
      )}
    </Stack>
  );
};

export default ToolbarTabs;
