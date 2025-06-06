import Chip from "@mui/material/Chip";
import getFileType from "../utils/getFileType.js";

const MimeType = ({ data }) => {
  const type = getFileType(data);
  return <Chip label={type?.label} size="small" />;
};

export default MimeType;
