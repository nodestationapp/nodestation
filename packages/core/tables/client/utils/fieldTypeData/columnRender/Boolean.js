import Chip from "@mui/material/Chip";

const Boolean = ({ data }) => {
  const labels = {
    1: "True",
    0: "False",
  };

  return data !== null ? <Chip label={labels[data]} size="small" /> : "-";
};

export default Boolean;
