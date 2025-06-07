import { alpha } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";
import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { chipClasses } from "@mui/material/Chip";
import { iconButtonClasses } from "@mui/material/IconButton";
import { gray, red, green, pink, brand } from "../themePrimitives.js";

/* eslint-disable import/prefer-default-export */
export const dataDisplayCustomizations = {
  MuiList: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        variants: [
          {
            props: {
              variant: "bordered",
            },
            style: {
              padding: 0,
              border: `1px solid ${(theme.vars || theme).palette.divider}`,
              borderRadius: (theme.vars || theme).shape.borderRadius,
              ".MuiListItem-root": {
                padding: 0,
                borderRadius: 0,
                backgroundColor: (theme.vars || theme).palette.background.paper,
                borderBottom: `1px solid ${
                  (theme.vars || theme).palette.divider
                }`,
                "&:first-child": {
                  borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
                  borderTopRightRadius: (theme.vars || theme).shape
                    .borderRadius,
                },
                "&:last-child": {
                  borderBottomLeftRadius: (theme.vars || theme).shape
                    .borderRadius,
                  borderBottomRightRadius: (theme.vars || theme).shape
                    .borderRadius,
                  borderBottom: "none",
                },
                [`& > .${buttonBaseClasses.root}`]: {
                  padding: "6px 10px",
                  borderRadius: 0,
                },
              },
            },
          },
        ],
      }),
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${svgIconClasses.root}`]: {
          width: "1rem",
          height: "1rem",
          color: (theme.vars || theme).palette.text.secondary,
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: "flex",
          gap: 8,
          padding: "2px 8px",
          borderRadius: (theme.vars || theme).shape.borderRadius,
          "&.Mui-selected": {
            opacity: 1,
            backgroundColor: alpha(theme.palette.action.selected, 0.15),
            [`& .${svgIconClasses.root}`]: {
              color: (theme.vars || theme).palette.text.primary,
            },
            "&:focus-visible": {
              backgroundColor: alpha(theme.palette.action.selected, 0.2),
            },
            "&:hover": {
              backgroundColor: alpha(theme.palette.action.selected, 0.3),
            },
          },
          "&:focus-visible": {
            backgroundColor: "transparent",
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: "transparent",
        padding: "4px 8px",
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: 0,
        color: (theme.vars || theme).palette.text.primary,
      }),
    },
  },
  MuiChip: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        border: "1px solid",
        borderRadius: "999px",
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        variants: [
          {
            props: {
              color: "default",
            },
            style: {
              borderColor: gray[200],
              backgroundColor: gray[100],
              [`& .${chipClasses.label}`]: {
                color: gray[500],
              },
              [`& .${chipClasses.deleteIcon}`]: {
                color: gray[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: gray[700],
                backgroundColor: gray[800],
                [`& .${chipClasses.label}`]: {
                  color: gray[300],
                },
                [`& .${chipClasses.deleteIcon}`]: {
                  color: gray[300],
                },
              }),
            },
          },
          {
            props: {
              color: "success",
            },
            style: {
              borderColor: green[200],
              backgroundColor: green[50],
              [`& .${chipClasses.label}`]: {
                color: green[500],
              },
              [`& .${chipClasses.deleteIcon}`]: {
                color: green[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: green[800],
                backgroundColor: green[900],
                [`& .${chipClasses.label}`]: {
                  color: green[300],
                },
                [`& .${chipClasses.deleteIcon}`]: {
                  color: green[300],
                },
              }),
            },
          },
          {
            props: {
              color: "error",
            },
            style: {
              borderColor: red[100],
              backgroundColor: red[50],
              [`& .${chipClasses.label}`]: {
                color: red[500],
              },
              [`& .${chipClasses.deleteIcon}`]: {
                color: red[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: red[800],
                backgroundColor: red[900],
                [`& .${chipClasses.label}`]: {
                  color: red[200],
                },
                [`& .${chipClasses.deleteIcon}`]: {
                  color: red[200],
                },
              }),
            },
          },
          {
            props: {
              color: "pink",
            },
            style: {
              borderColor: pink[200],
              backgroundColor: pink[50],
              [`& .${chipClasses.label}`]: {
                color: pink[500],
              },
              [`& .${chipClasses.deleteIcon}`]: {
                color: pink[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: pink[800],
                backgroundColor: pink[900],
                [`& .${chipClasses.label}`]: {
                  color: pink[300],
                },
                [`& .${chipClasses.deleteIcon}`]: {
                  color: pink[300],
                },
              }),
            },
          },
          {
            props: {
              color: "info",
            },
            style: {
              borderColor: brand[200],
              backgroundColor: brand[50],
              [`& .${chipClasses.label}`]: {
                color: brand[500],
              },
              [`& .${chipClasses.deleteIcon}`]: {
                color: brand[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: brand[800],
                backgroundColor: brand[900],
                [`& .${chipClasses.label}`]: {
                  color: brand[300],
                },
                [`& .${chipClasses.deleteIcon}`]: {
                  color: brand[300],
                },
              }),
            },
          },
          {
            props: { size: "small" },
            style: {
              maxHeight: 25,
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
              [`& .${svgIconClasses.root}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
          {
            props: { size: "medium" },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        ],
      }),
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: "flex",
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiIcon: {
    defaultProps: {
      fontSize: "small",
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: {
              fontSize: "small",
            },
            style: {
              fontSize: "1rem",
            },
          },
        ],
      },
    },
  },
};
