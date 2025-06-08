import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import { alpha } from "@mui/material/styles";

import { AsideModal } from "@nstation/design-system";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useState } from "react";
import { MenuItem } from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
const boolean_options = [
  {
    label: "Public",
    value: "public",
    icon: <PublicOutlinedIcon fontSize="small" />,
  },
  {
    label: "Client",
    value: 1,
  },
  {
    label: "Admin",
    value: 0,
  },
];

const TableDocs = ({ open, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [collapse, setCollapse] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const onChangePermissions = (value) => {
    const lastValue = value[value.length - 1];

    if (lastValue === "public") {
      setPermissions(["public"]);
    } else {
      value = value.filter((item) => item !== "public");
      setPermissions(value);
    }
  };

  const docs = [
    {
      title: "Security",
      card: {
        icon: <LockOutlinedIcon fontSize="small" />,
        title: "Access Token",
        action: (
          <>
            <Select
              multiple={true}
              fullWidth
              // label={label}
              size="medium"
              variant="outlined"
              value={permissions}
              onChange={(e) => onChangePermissions(e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  gap: 1,
                },
              }}
              // name={slug}
              // labelId={slug}
              // onChange={onChange}
              // value={value}
            >
              {boolean_options?.map((item) => (
                <MenuItem value={item?.value} sx={{ gap: 1 }}>
                  {item?.icon}
                  {item?.label}
                </MenuItem>
              ))}
            </Select>
          </>
        ),
        items: [
          {
            title: "Header parameter name",
            badges: [{ label: "access_token", color: "error.light" }],
          },
        ],
      },
    },
    {
      title: "Body parameters",
      card: {
        items: [
          {
            title: "category_id",
            badges: [
              { label: "String" },
              { label: "Required", color: "error.light" },
            ],
          },
          {
            title: "category_id",
            badges: [
              { label: "String" },
              { label: "Required", color: "error.light" },
            ],
          },
        ],
      },
    },
  ];

  return (
    <AsideModal
      open={open}
      width={550}
      onClose={onClose}
      // onSubmit={formik.handleSubmit}
      // submitLoading={formik.isSubmitting}
      header="Table Docs"
      // header={open?.[table_data?.table?.displayName || "id"] || "Add entry"}
    >
      <Stack gap={1} direction="column">
        <Typography variant="body">Add a new entry</Typography>
        <Stack
          direction="column"
          sx={(theme) => ({
            borderRadius: 1,
            border: `1px solid #49CC90`,
          })}
        >
          <Stack
            direction="row"
            alignItems="center"
            p={1.5}
            gap={1}
            onClick={() => setCollapse(!collapse)}
            sx={(theme) => ({
              cursor: "pointer",

              "&:hover": {
                backgroundColor: alpha(theme.palette.action.hover, 0.1),
              },
            })}
          >
            <Chip
              label="GET"
              variant="filled"
              color="#49CC90"
              sx={{
                border: "none",
                borderRadius: 0.6,
                backgroundColor: "#49CC90",
              }}
            />
            <Tooltip
              title={copied ? "Copied" : "Copy to clipboard"}
              onMouseLeave={() => setTimeout(() => setCopied(false), 500)}
              placement="top"
            >
              <Typography
                onClick={() => {
                  navigator.clipboard.writeText("/tables/projects");
                  setCopied(true);
                }}
                fontWeight={500}
                sx={(theme) => ({
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: alpha(theme.palette.divider, 0.3),
                  },
                })}
              >
                /tables/projects
              </Typography>
            </Tooltip>
            <Stack direction="row" alignItems="center" gap={1} ml="auto">
              <PublicOutlinedIcon fontSize="small" />
              <ExpandMoreIcon />
            </Stack>
          </Stack>
          <Collapse in={collapse}>
            <Divider />
            <Stack direction="column" gap={2} p={1.5}>
              {docs.map((item, index) => (
                <Stack key={index} direction="column" gap={1}>
                  <Typography variant="body" fontWeight={600}>
                    {item?.title}
                  </Typography>
                  {!!item?.card && (
                    <Card sx={{ backgroundColor: "transparent" }}>
                      {!!item?.card?.title && (
                        <CardHeader
                          title={
                            <Typography
                              variant="body"
                              fontWeight={600}
                              display="flex"
                              gap={0.7}
                              alignItems="center"
                              ml={-0.3}
                              mb={1}
                            >
                              {item?.card?.icon}
                              {item?.card?.title}
                            </Typography>
                          }
                        />
                      )}
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {item?.card?.items?.map((item, index) => (
                          <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            gap={0.5}
                          >
                            <Typography
                              variant="caption"
                              mr={0.5}
                              fontWeight={500}
                            >
                              {item?.title}
                            </Typography>
                            {item?.badges?.map((badge, index) => (
                              <Chip
                                key={index}
                                label={badge?.label}
                                sx={(theme) => ({
                                  backgroundColor: "transparent",
                                  borderColor: (theme.vars || theme).palette
                                    .divider,
                                  borderRadius: 0.6,

                                  "& .MuiChip-label": {
                                    fontWeight: 500,
                                    px: "4px",
                                    color: badge?.color,
                                    fontSize: theme.typography.caption.fontSize,
                                  },
                                })}
                              />
                            ))}
                          </Stack>
                        ))}
                        {item?.card?.action}
                      </CardContent>
                    </Card>
                  )}
                </Stack>
              ))}
            </Stack>
          </Collapse>
        </Stack>
      </Stack>
    </AsideModal>
  );
};

export default TableDocs;
