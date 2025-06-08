import { Fragment, useState } from "react";

import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import { alpha } from "@mui/material/styles";

import { AsideModal } from "@nstation/design-system";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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

  const onCollapse = (index) => {
    setCollapse(index === collapse ? null : index);
  };

  const docs_data = [
    {
      method: "POST",
      description: "Create a new project",
      url: "/tables/projects",
      items: [
        {
          title: "Security",
          card: {
            icon: permissions?.includes("public") ? (
              <PublicOutlinedIcon fontSize="small" />
            ) : (
              <LockOutlinedIcon fontSize="small" />
            ),
            title: permissions?.includes("public")
              ? "Public Access"
              : "Access Token",
            action: (
              <>
                <Select
                  multiple={true}
                  fullWidth
                  displayEmpty
                  size="medium"
                  variant="outlined"
                  value={permissions}
                  onChange={(e) => onChangePermissions(e.target.value)}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select permissions</em>;
                    }

                    selected = selected?.map((item, index) => {
                      const part = boolean_options?.find(
                        (part) => part?.value === item
                      );

                      return (
                        <>
                          <Stack direction="row" alignItems="center" gap={1}>
                            {index > 0 && ", "}
                            {part?.icon}
                            {part?.label}
                          </Stack>
                        </>
                      );
                    });

                    return selected;
                  }}
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
                title: permissions?.includes("public")
                  ? "Everyone can access the table"
                  : "Header parameter name",
                badges: !!permissions?.includes("public")
                  ? []
                  : [{ label: "access_token", color: "error.light" }],
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
      ],
    },
    {
      method: "GET",
      description: "Get all projects",
      url: "/tables/projects",
      items: [
        {
          title: "Security",
          card: {
            icon: permissions?.includes("public") ? (
              <PublicOutlinedIcon fontSize="small" />
            ) : (
              <LockOutlinedIcon fontSize="small" />
            ),
            title: permissions?.includes("public")
              ? "Public Access"
              : "Access Token",
            action: (
              <>
                <Select
                  multiple={true}
                  fullWidth
                  displayEmpty
                  size="medium"
                  variant="outlined"
                  value={permissions}
                  onChange={(e) => onChangePermissions(e.target.value)}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select permissions</em>;
                    }

                    selected = selected?.map((item, index) => {
                      const part = boolean_options?.find(
                        (part) => part?.value === item
                      );

                      return (
                        <>
                          <Stack direction="row" alignItems="center" gap={1}>
                            {index > 0 && ", "}
                            {part?.icon}
                            {part?.label}
                          </Stack>
                        </>
                      );
                    });

                    return selected;
                  }}
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
                title: permissions?.includes("public")
                  ? "Everyone can access the table"
                  : "Header parameter name",
                badges: !!permissions?.includes("public")
                  ? []
                  : [{ label: "access_token", color: "error.light" }],
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
      ],
    },
    {
      method: "PUT",
      description: "Update a project",
      url: "/tables/projects/:id",
      items: [
        {
          title: "Security",
          card: {
            icon: permissions?.includes("public") ? (
              <PublicOutlinedIcon fontSize="small" />
            ) : (
              <LockOutlinedIcon fontSize="small" />
            ),
            title: permissions?.includes("public")
              ? "Public Access"
              : "Access Token",
            action: (
              <>
                <Select
                  multiple={true}
                  fullWidth
                  displayEmpty
                  size="medium"
                  variant="outlined"
                  value={permissions}
                  onChange={(e) => onChangePermissions(e.target.value)}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select permissions</em>;
                    }

                    selected = selected?.map((item, index) => {
                      const part = boolean_options?.find(
                        (part) => part?.value === item
                      );

                      return (
                        <>
                          <Stack direction="row" alignItems="center" gap={1}>
                            {index > 0 && ", "}
                            {part?.icon}
                            {part?.label}
                          </Stack>
                        </>
                      );
                    });

                    return selected;
                  }}
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
                title: permissions?.includes("public")
                  ? "Everyone can access the table"
                  : "Header parameter name",
                badges: !!permissions?.includes("public")
                  ? []
                  : [{ label: "access_token", color: "error.light" }],
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
      ],
    },
    {
      method: "DELETE",
      description: "Delete a project",
      url: "/tables/projects/:id",
      items: [
        {
          title: "Security",
          card: {
            icon: permissions?.includes("public") ? (
              <PublicOutlinedIcon fontSize="small" />
            ) : (
              <LockOutlinedIcon fontSize="small" />
            ),
            title: permissions?.includes("public")
              ? "Public Access"
              : "Access Token",
            action: (
              <>
                <Select
                  multiple={true}
                  fullWidth
                  displayEmpty
                  size="medium"
                  variant="outlined"
                  value={permissions}
                  onChange={(e) => onChangePermissions(e.target.value)}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select permissions</em>;
                    }

                    selected = selected?.map((item, index) => {
                      const part = boolean_options?.find(
                        (part) => part?.value === item
                      );

                      return (
                        <>
                          <Stack direction="row" alignItems="center" gap={1}>
                            {index > 0 && ", "}
                            {part?.icon}
                            {part?.label}
                          </Stack>
                        </>
                      );
                    });

                    return selected;
                  }}
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
                title: permissions?.includes("public")
                  ? "Everyone can access the table"
                  : "Header parameter name",
                badges: !!permissions?.includes("public")
                  ? []
                  : [{ label: "access_token", color: "error.light" }],
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
      ],
    },
  ];

  return (
    <AsideModal
      open={open}
      width={550}
      onClose={onClose}
      onSubmit={() => {}}
      submitLoading={false}
      header="Table Docs"
    >
      <Stack direction="column" gap={2}>
        {docs_data?.map((doc, index) => {
          const color =
            doc?.method === "GET"
              ? "#1191FF"
              : doc?.method === "POST"
              ? "#49CC90"
              : doc?.method === "PUT"
              ? "#E97500"
              : "#F93F3E";

          return (
            <Stack key={index} gap={1} direction="column">
              {/* <Typography variant="body" fontWeight={600}>
                {doc?.description}
              </Typography> */}
              <Stack
                direction="column"
                sx={(theme) => ({
                  borderRadius: 1,
                  border: `1px solid ${color}`,
                })}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  p={1.5}
                  gap={1}
                  onClick={() => onCollapse(index)}
                  sx={(theme) => ({
                    cursor: "pointer",
                    backgroundColor: alpha(color, 0.1),
                    "&:hover": {
                      backgroundColor: alpha(color, 0.1),
                    },
                  })}
                >
                  <Chip
                    label={doc?.method}
                    variant="filled"
                    color="#49CC90"
                    sx={{
                      border: "none",
                      color: "#fff",
                      borderRadius: 0.6,
                      backgroundColor: color,
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
                <Collapse in={collapse === index}>
                  <Divider />
                  <Stack direction="column" gap={2} p={1.5}>
                    {doc.items.map((item, index) => (
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
                                        borderColor: (theme.vars || theme)
                                          .palette.divider,
                                        borderRadius: 0.6,

                                        "& .MuiChip-label": {
                                          fontWeight: 500,
                                          px: "4px",
                                          color: badge?.color,
                                          fontSize:
                                            theme.typography.caption.fontSize,
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
          );
        })}
      </Stack>
    </AsideModal>
  );
};

export default TableDocs;
