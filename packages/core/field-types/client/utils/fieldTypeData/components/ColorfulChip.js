import Chip from "@mui/material/Chip";
import { styled, keyframes } from "@mui/material/styles";

const glowing = keyframes`
  0% {
    background-position: 0%;
  }
  100% {
    background-position: -400%;
  }
`;

const ColorfulChip = styled(Chip)(() => ({
  backgroundColor: "transparent",
  border: "2px solid #ffffff22",
  fontWeight: 600,
  color: "transparent",
  backgroundImage: "linear-gradient(90deg, #04f5ed, #5c27fe, #c165dd, #04f5ed)",
  backgroundSize: "400%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${glowing} 8s linear infinite`,
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    zIndex: -1,
    background: "linear-gradient(90deg, #04f5ed, #5c27fe, #c165dd, #04f5ed)",
    backgroundSize: "400%",
    borderRadius: "999px",
    animation: `${glowing} 8s linear infinite`,
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    WebkitMaskComposite: "destination-out",
    padding: "1.5px",
    boxSizing: "border-box",
  },
}));

export default ColorfulChip;
