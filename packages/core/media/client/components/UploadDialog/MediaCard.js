import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";

import MimeType from "../MimeType.js";
import formatBytes from "../../utils/formatBytes.js";
import getFileType from "../../utils/getFileType.js";

import Link from "@mui/icons-material/Link";
import Delete from "@mui/icons-material/Delete";

const MediaCard = ({ file, percent, onDelete }) => {
  const type = getFileType(file?.type);

  const is_uploading = !!percent && percent !== 100;

  console.log(type);

  return (
    <Card sx={{ width: "100%", p: 1, pb: 0, zIndex: -2 }}>
      <CardMedia
        sx={(theme) => ({
          position: "relative",
          height: 140,
          borderRadius: 0.5,
          overflow: "hidden",
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "120%",
            height: "120%",
            backgroundImage: `url("${file?.url}")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
            "-webkit-filter": "blur(15px) brightness(0.6)",
            "-moz-filter": "blur(15px) brightness(0.6)",
            "-o-filter": "blur(15px) brightness(0.6)",
            "-ms-filter": "blur(15px) brightness(0.6)",
            filter: "blur(15px) brightness(0.6)",
            "-webkit-transform": "scale(1.8, 1.8)",
            "-moz-transform": "scale(1.8, 1.8)",
            "-o-transform": "scale(1.8, 1.8)",
            "-ms-transform": "scale(1.8, 1.8)",
            transform: "scale(1.8, 1.8)",
            zIndex: 0,
            display: is_uploading ? "none" : "block",
          },
          zIndex: 1,
        })}
        image={is_uploading ? null : file?.url}
        title="green iguana"
        children={
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {is_uploading ? (
              <LinearProgress
                variant="determinate"
                value={percent || 0}
                sx={(theme) => {
                  return {
                    width: "70%",
                    height: "7px",
                    backgroundColor: `${theme.palette.grey[700]} !important`,
                  };
                }}
              />
            ) : (
              <>
                {type?.label === "Image" ? (
                  <img
                    src={file?.url}
                    alt={file?.name}
                    style={{ height: "100%", zIndex: 1000000 }}
                  />
                ) : (
                  type?.icon
                )}
              </>
            )}
          </Box>
        }
      />
      <CardContent
        sx={{
          py: 1,
          pt: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Stack direction="column" gap={0} sx={{ overflow: "hidden" }}>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ m: 0, mt: 1, textOverflow: "ellipsis" }}
            noWrap
          >
            {file?.name}
          </Typography>
          <Typography gutterBottom variant="caption" color="text.secondary">
            {formatBytes(file?.size)}
          </Typography>
        </Stack>
        <>
          <Box
            sx={{
              display: "flex",
              ".MuiCard-root:hover &": {
                display: "none",
              },
            }}
          >
            <MimeType data={file?.type} />
          </Box>
          <Stack
            direction="row"
            gap={0}
            sx={{
              display: "none",
              ".MuiCard-root:hover &": {
                display: "flex",
              },
            }}
          >
            <IconButton
              size="micro"
              onClick={() => window.open(file?.url, "_blank")}
            >
              <Link />
            </IconButton>
            <IconButton size="micro" onClick={() => onDelete(file?.id)}>
              <Delete />
            </IconButton>
          </Stack>
        </>
        {/* {percent?.[index] && percent?.[index] !== 100 ? (
          <CircularProgress size={20} />
        ) : onSelect ? (
          <Checkbox />
        ) : (

        )} */}
      </CardContent>
    </Card>
  );
};

export default MediaCard;
