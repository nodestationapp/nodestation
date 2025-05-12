import { useColorScheme } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";

const ColorModeDropdown = () => {
  const { mode, systemMode, setMode } = useColorScheme();
  const currentMode = systemMode || mode;

  const toggleMode = () => {
    setMode(currentMode === "light" ? "dark" : "light");
  };

  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
  }[currentMode];

  return (
    <IconButton onClick={toggleMode} disableRipple size="small">
      {icon}
    </IconButton>
  );
};

export default ColorModeDropdown;
