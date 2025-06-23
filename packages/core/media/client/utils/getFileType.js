import Image from "@mui/icons-material/Image";
import Article from "@mui/icons-material/Article";
import Videocam from "@mui/icons-material/Videocam";
import MusicNote from "@mui/icons-material/MusicNote";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";

const getFileType = (type) => {
  if (!type)
    return {
      label: "Unknown",
      icon: (
        <InsertDriveFile
          sx={(theme) => ({
            height: 50,
            width: 50,
            color: (theme.vars || theme).palette.divider,
          })}
        />
      ),
    };

  switch (true) {
    case type.startsWith("image/"):
      return {
        label: "Image",
        icon: (
          <Image
            sx={(theme) => ({
              height: 50,
              width: 50,
              color: (theme.vars || theme).palette.divider,
            })}
          />
        ),
      };
    case type.startsWith("video/"):
      return {
        label: "Video",
        icon: (
          <Videocam
            sx={(theme) => ({
              height: 50,
              width: 50,
              color: (theme.vars || theme).palette.divider,
            })}
          />
        ),
      };
    case type.startsWith("audio/"):
      return {
        label: "Audio",
        icon: (
          <MusicNote
            sx={(theme) => ({
              height: 50,
              width: 50,
              color: (theme.vars || theme).palette.divider,
            })}
          />
        ),
      };
    case type.startsWith("text/"):
      return {
        label: "Text",
        icon: (
          <Article
            sx={(theme) => ({
              height: 50,
              width: 50,
              color: (theme.vars || theme).palette.divider,
            })}
          />
        ),
      };
    case type.startsWith("application/"):
      if (type.includes("octet-stream"))
        return {
          label: "File",
          icon: (
            <InsertDriveFile
              sx={(theme) => ({
                height: 50,
                width: 50,
                color: (theme.vars || theme).palette.divider,
              })}
            />
          ),
        };
      else
        return {
          label: "Document",
          icon: (
            <Article
              sx={(theme) => ({
                height: 50,
                width: 50,
                color: (theme.vars || theme).palette.divider,
              })}
            />
          ),
        };
    default:
      return {
        label: "File",
        icon: (
          <InsertDriveFile
            sx={(theme) => ({
              height: 50,
              width: 50,
              color: (theme.vars || theme).palette.divider,
            })}
          />
        ),
      };
  }
};

export default getFileType;
