import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";

import MimeType from "#client/components/MimeType.js";
import formatBytes from "#client/utils/formatBytes.js";
import getFileType from "#client/utils/getFileType.js";

import Link from "@mui/icons-material/Link";
import Delete from "@mui/icons-material/Delete";

const MediaCard = ({
  file,
  percent,
  onDelete,
  onSelect,
  selected,
  multiple = false,
}) => {
  const type = getFileType(file?.type);

  const is_uploading = !!percent && percent !== 100;

  const onSelectHandler = () => {
    if (multiple) {
      if (file?.id === selected?.id) {
        onSelect((prev) => prev.filter((f) => f?.id !== file?.id));
      } else {
        onSelect((prev) => [...prev, file]);
      }
    } else {
      if (file?.id === selected?.id) {
        onSelect([]);
      } else {
        onSelect([file]);
      }
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        p: 1,
        pb: 0,
        zIndex: -2,
      }}
    >
      <CardMedia
        sx={(theme) => ({
          position: "relative",
          height: 140,
          borderRadius: 0.5,
          overflow: "hidden",
          zIndex: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.5)`
            : alpha(theme.palette.background.default, 1),
        })}
        children={
          <Box
            key={selected}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <>
              {type?.label === "Image" ? (
                <img
                  src={file?.url}
                  alt={file?.name}
                  loading="lazy"
                  style={{ height: "100%", zIndex: 10 }}
                />
              ) : (
                type?.icon
              )}
            </>
            {!!onSelect && !is_uploading && (
              <Checkbox
                key={selected}
                sx={{
                  position: "absolute",
                  right: 1,
                  bottom: 1,
                  zIndex: 11,
                }}
                checked={selected}
                onChange={onSelectHandler}
              />
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
      </CardContent>
    </Card>
  );
};

export default MediaCard;
