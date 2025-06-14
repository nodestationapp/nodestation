import { alpha } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { toggleButtonClasses } from "@mui/material/ToggleButton";
import { toggleButtonGroupClasses } from "@mui/material/ToggleButtonGroup";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";

import { gray, brand } from "../themePrimitives.js";

/* eslint-disable import/prefer-default-export */
export const inputsCustomizations = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: "border-box",
        transition: "all 100ms ease-in",
        "&:focus-visible": {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: "2px",
        },
      }),
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: "none",
        minWidth: "unset",
        "&.Mui-disabled": {
          border: "none",
        },
        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              height: "2.1rem",
              padding: "8px 10px",
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              height: "2.25rem",
              padding: "8px 12px",
            },
          },
          {
            props: {
              color: "primary",
              variant: "contained",
            },
            style: {
              color: "white",
              backgroundColor: gray[900],
              boxShadow: `inset 0 1px 0 ${gray[600]}, inset 0 -1px 0 1px hsl(220, 0%, 0%)`,
              border: `1px solid ${gray[700]}`,
              "&:hover": {
                backgroundColor: gray[700],
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: gray[800],
              },
              ...theme.applyStyles("dark", {
                color: "black",
                backgroundColor: gray[50],
                boxShadow: "none",
                border: `1px solid ${gray[50]}`,
                "&:hover": {
                  backgroundImage: "none",
                  backgroundColor: gray[300],
                  boxShadow: "none",
                },
                "&:active": {
                  backgroundColor: gray[400],
                },
                "&.Mui-disabled": {
                  border: "none",
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "contained",
            },
            style: {
              color: "white",
              backgroundColor: brand[300],
              backgroundImage: `linear-gradient(to bottom, ${alpha(
                brand[400],
                0.8
              )}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha(
                brand[200],
                0.2
              )}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              border: `1px solid ${brand[500]}`,
              "&:hover": {
                backgroundColor: brand[700],
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: brand[700],
                backgroundImage: "none",
              },
            },
          },
          {
            props: {
              variant: "outlined",
            },
            style: {
              color: (theme.vars || theme).palette.text.primary,
              border: "1px solid",
              borderColor: gray[200],
              backgroundColor: alpha(gray[50], 0.3),
              "&:hover": {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              "&:active": {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles("dark", {
                backgroundColor: gray[800],
                borderColor: gray[700],
                "&:hover": {
                  backgroundColor: gray[900],
                  borderColor: gray[600],
                },
                "&:active": {
                  backgroundColor: gray[900],
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "outlined",
            },
            style: {
              color: brand[700],
              border: "1px solid",
              borderColor: brand[200],
              backgroundColor: brand[50],
              "&:hover": {
                backgroundColor: brand[100],
                borderColor: brand[400],
              },
              "&:active": {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles("dark", {
                color: brand[50],
                border: "1px solid",
                borderColor: brand[900],
                backgroundColor: alpha(brand[900], 0.3),
                "&:hover": {
                  borderColor: brand[700],
                  backgroundColor: alpha(brand[900], 0.6),
                },
                "&:active": {
                  backgroundColor: alpha(brand[900], 0.5),
                },
              }),
            },
          },
          {
            props: {
              variant: "text",
            },
            style: {
              color: gray[600],
              "&:hover": {
                backgroundColor: gray[100],
              },
              "&:active": {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles("dark", {
                color: gray[50],
                "&:hover": {
                  backgroundColor: gray[700],
                },
                "&:active": {
                  backgroundColor: alpha(gray[700], 0.7),
                },
              }),
            },
          },
          {
            props: {
              color: "secondary",
              variant: "text",
            },
            style: {
              color: brand[700],
              "&:hover": {
                backgroundColor: alpha(brand[100], 0.5),
              },
              "&:active": {
                backgroundColor: alpha(brand[200], 0.7),
              },
              ...theme.applyStyles("dark", {
                color: brand[100],
                "&:hover": {
                  backgroundColor: alpha(brand[900], 0.5),
                },
                "&:active": {
                  backgroundColor: alpha(brand[900], 0.3),
                },
              }),
            },
          },
        ],
      }),
      startIcon: ({ theme }) => ({
        marginRight: theme.spacing(0.5),
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: "none",
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: "none",
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        color: (theme.vars || theme).palette.text.primary,
        border: "1px solid ",
        borderColor: gray[200],
        backgroundColor: alpha(gray[50], 0.3),
        "&:hover": {
          backgroundColor: gray[100],
          borderColor: gray[300],
        },
        "&:active": {
          backgroundColor: gray[200],
        },
        ...theme.applyStyles("dark", {
          backgroundColor: gray[800],
          borderColor: gray[700],
          "&:hover": {
            backgroundColor: gray[900],
            borderColor: gray[600],
          },
          "&:active": {
            backgroundColor: gray[900],
          },
          "&.MuiIconButton-sizeMicro": {
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: alpha(theme.palette.action.selected, 0.1),
            },
          },
        }),
        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              width: "2.25rem",
              height: "2.25rem",
              padding: "0.25rem",
              [`& .${svgIconClasses.root}`]: { fontSize: "1rem" },
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              width: "2.5rem",
              height: "2.5rem",
            },
          },
          {
            props: {
              size: "micro",
            },
            style: {
              width: "1.8rem",
              height: "1.8rem",
              padding: "0.25rem",
              border: "none",
              backgroundColor: "transparent",
              [`& .${svgIconClasses.root}`]: { fontSize: "1rem" },
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: "10px",
        boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: brand[500],
        },
        ...theme.applyStyles("dark", {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: "#fff",
          },
          boxShadow: `0 4px 16px ${alpha(brand[700], 0.5)}`,
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "12px 16px",
        textTransform: "none",
        borderRadius: "10px",
        fontWeight: 500,
        ...theme.applyStyles("dark", {
          color: gray[400],
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
          [`&.${toggleButtonClasses.selected}`]: {
            color: brand[300],
          },
        }),
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
      icon: (
        <CheckBoxOutlineBlankRoundedIcon
          sx={{ color: "hsla(210, 0%, 0%, 0.0)" }}
        />
      ),
      checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
      indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 10,
        height: 16,
        width: 16,
        borderRadius: 5,
        border: "1px solid ",
        borderColor: alpha(gray[300], 0.8),
        boxShadow: "0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset",
        backgroundColor: alpha(gray[100], 0.4),
        transition: "border-color, background-color, 120ms ease-in",
        "&:hover": {
          borderColor: brand[300],
        },
        "&.Mui-focusVisible": {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: "2px",
          borderColor: brand[400],
        },
        "&.Mui-checked": {
          color: "white",
          backgroundColor: brand[500],
          borderColor: brand[500],
          boxShadow: `none`,
          "&:hover": {
            backgroundColor: brand[600],
          },
        },
        ...theme.applyStyles("dark", {
          borderColor: alpha(gray[700], 0.8),
          boxShadow: "0 0 0 1.5px hsl(210, 0%, 0%) inset",
          backgroundColor: alpha(gray[900], 0.8),
          "&:hover": {
            borderColor: brand[300],
          },
          "&.Mui-focusVisible": {
            borderColor: brand[400],
            outline: `3px solid ${alpha(brand[500], 0.5)}`,
            outlineOffset: "2px",
          },
        }),
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiInput-underline": {
          border: "1px solid ",
          borderColor: alpha(gray[300], 0.8),
          padding: "4px 12px",
          marginTop: "0px !important",
          borderRadius: (theme.vars || theme).shape.borderRadius,

          "&:hover": {
            borderColor: "#000",
          },

          "&.Mui-focused": {
            outline: 0,
            borderColor: "#000",
          },

          "&.Mui-disabled": {
            pointerEvents: "none",
          },

          ...theme.applyStyles("dark", {
            "&:hover": {
              borderColor: "#fff",
            },

            "&.Mui-focused": {
              outline: 0,
              borderColor: "#fff",
            },
          }),
        },
        "&:before": {
          display: "none",
        },
        "&:after": {
          display: "none",
        },
      }),
      input: {
        "&::placeholder": {
          opacity: 0.7,
          color: gray[500],
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.text.primary,
        "&.Mui-disabled": {
          opacity: 0.5,
        },
        // "&.Mui-focused": {
        //   opacity: "hsl(0, 0%, 100%)",
        // },
        variants: [
          {
            props: {
              size: "small",
            },
            style: {
              height: "2.25rem",
            },
          },
          {
            props: {
              size: "medium",
            },
            style: {
              height: "2.5rem",
            },
          },
        ],
      }),
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        padding: 0,
        "& .MuiOutlinedInput-root": {
          padding: "9px",
          height: "fit-content",
          ".MuiOutlinedInput-input": {
            padding: "1px 6px",
            height: "fit-content",
          },
        },
        "& .MuiInputBase-root": {
          padding: "6px 9px",
        },
      },
      endAdornment: {
        ".MuiButtonBase-root": {
          width: "1.8rem",
          height: "1.8rem",
          padding: "0.25rem",
          border: "none",
          backgroundColor: "transparent",
          [`& .${svgIconClasses.root}`]: { fontSize: "1rem" },
        },
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: (theme.vars || theme).palette.grey[500],
        ...theme.applyStyles("dark", {
          color: (theme.vars || theme).palette.grey[400],
        }),
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 0,
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 0,
        top: -5,
        transitionProperty: "color, transform, max-width, top",
        "&.MuiInputLabel-standard": {
          position: "relative",
          transform: "none",
          marginBottom: "6px !important",
          top: 0,
          fontSize: theme.typography.body,

          "&.Mui-focused": {
            color: "#000",
          },

          ...theme.applyStyles("dark", {
            "&.Mui-focused": {
              color: "#fff",
            },
          }),
        },
      }),
      shrink: {
        top: 0,
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: () => ({
        marginLeft: 0,
        marginRight: 0,
      }),
    },
  },
};
