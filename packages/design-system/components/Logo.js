import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import MuiAvatar from "@mui/material/Avatar";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

const possibleLogos = ["logo.svg", "logo.png", "logo.jpg"];

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const isImage = (res) => {
  const contentType = res.headers.get("Content-Type");
  return contentType && contentType.startsWith("image/");
};

const checkImages = async (setLogoSrc) => {
  for (let file of possibleLogos) {
    const url = `${process.env.PUBLIC_URL}/${file}`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok && isImage(res)) {
        setLogoSrc(url);
        break;
      }
    } catch (e) {}
  }
};

const Logo = ({ size = 50, borderRadius = 2 }) => {
  const [logoSrc, setLogoSrc] = useState(null);

  useEffect(() => {
    checkImages(setLogoSrc);
  }, []);

  return logoSrc ? (
    <MuiAvatar
      src={logoSrc}
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
