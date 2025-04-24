import { Chip } from "@mui/material";
import getFileType from "libs/helpers/getFileType";

const MimeType = ({ data }) => {
  const type = getFileType(data);
  return <Chip icon={type.icon} label={type?.label} color="gray" />;
};

export default MimeType;
