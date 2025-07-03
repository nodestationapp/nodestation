import MuiAvatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

import { useApp } from "contexts/app";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const Logo = ({ size = 50, borderRadius = 2 }) => {
  const { site } = useApp();

  return site?.logo ? (
    <MuiAvatar
      src={site?.logo}
      alt="logo"
      sx={{ borderRadius: 0, width: size, height: size }}
    />
  ) : (
    <Avatar alt="Sitemark web" sx={{ width: size, height: size, borderRadius }}>
      <DevicesRoundedIcon sx={{ fontSize: "1rem" }} />
    </Avatar>
  );
};

export default Logo;
