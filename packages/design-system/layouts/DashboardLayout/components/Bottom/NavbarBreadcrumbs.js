import { Link, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

import { IconifyIcon } from "@nstation/design-system";

import { useApp } from "contexts/app.js";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

function getBreadcrumbs(path) {
  const segments = path.split("/").filter(Boolean).slice(1);
  return segments.map((segment) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
  }));
}

export default function NavbarBreadcrumbs() {
  const { menuLinks } = useApp();
  const { pathname } = useLocation();

  let currentView = menuLinks.find(
    (link) => link?.to?.replace(/^\//, "") === pathname?.split("/")[1]
  );

  if (pathname?.split("/")[1] === "tables") {
    currentView = {
      label: "Tables",
      icon: "mdi:table",
    };
  }

  const breadcrumbs = [
    {
      label: currentView?.label,
      icon: currentView?.icon,
      href: pathname === currentView?.to ? undefined : currentView?.to,
    },
    ...getBreadcrumbs(pathname),
  ];

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      sx={{
        "& .MuiBreadcrumbs-ol": {
          overflow: "hidden",
          flexWrap: "nowrap",
          textOverflow: "ellipsis",
        },
      }}
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs?.map((item, index) => (
        <Box
          component={item?.href ? Link : null}
          to={item?.href}
          key={index}
          variant="body1"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: index === breadcrumbs.length - 1 ? 500 : 400,
            color: "text.secondary",
            textDecoration: "none",
            "&:hover": {
              textDecoration: item?.href ? "underline" : "none",
            },
          }}
        >
          {!!item.icon && (
            <Box
              sx={{
                height: 16,
                width: 16,
                mr: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              <IconifyIcon icon={item?.icon} />
            </Box>
          )}
          {item?.label}
        </Box>
      ))}
    </StyledBreadcrumbs>
  );
}
