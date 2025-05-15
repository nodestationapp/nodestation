import Chip from "@mui/material/Chip";
import getFileType from "../utils/getFileType.js";

const MimeType = ({ data }) => {
  const type = getFileType(data);
  return <Chip icon={type.icon} label={type?.label} color="gray" />;
};

export default MimeType;
