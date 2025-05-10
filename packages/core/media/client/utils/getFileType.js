import { DocumentIcon } from "@heroicons/react/24/outline";

import Image from "@mui/icons-material/Image";
import Article from "@mui/icons-material/Article";
import Videocam from "@mui/icons-material/Videocam";
import MusicNote from "@mui/icons-material/MusicNote";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";

const getFileType = (type) => {
  if (!type)
    return {
      label: "Unknown",
      icon: <DocumentIcon sx={{ height: 15, width: 15 }} />,
    };

  switch (true) {
    case type.startsWith("image/"):
      return { label: "Image", icon: <Image sx={{ height: 15, width: 15 }} /> };
    case type.startsWith("video/"):
      return {
        label: "Video",
        icon: <Videocam sx={{ height: 15, width: 15 }} />,
      };
    case type.startsWith("audio/"):
      return {
        label: "Audio",
        icon: <MusicNote sx={{ height: 15, width: 15 }} />,
      };
    case type.startsWith("text/"):
      return {
        label: "Text",
        icon: <Article sx={{ height: 15, width: 15 }} />,
      };
    case type.startsWith("application/"):
      if (type.includes("octet-stream"))
        return {
          label: "File",
          icon: <InsertDriveFile sx={{ height: 15, width: 15 }} />,
        };
      else
        return {
          label: "Document",
          icon: <Article sx={{ height: 15, width: 15 }} />,
        };
    default:
      return {
        label: "File",
        icon: <InsertDriveFile sx={{ height: 15, width: 15 }} />,
      };
  }
};

export default getFileType;
