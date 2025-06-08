import { Fragment } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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

const create = [
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
];

const get = [
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
];

const update = [
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
];

const remove = [
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

const crud_list = [create, get, update, remove];

export default crud_list;
