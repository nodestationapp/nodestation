import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";

import formatBytes from "../../utils/formatBytes.js";

import Link from "@mui/icons-material/Link";
import Delete from "@mui/icons-material/Delete";

const UploadedItems = ({ files, percent, onSelect, onDelete }) => {
  return (
    <Grid container spacing={2} sx={{ pb: 0 }}>
      {files?.map((file, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <Card sx={{ width: "100%", p: 1, pb: 0 }}>
            <CardMedia
              sx={{ height: 140, borderRadius: 0.5 }}
              image={file?.url}
              title="green iguana"
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
                <Typography
                  gutterBottom
                  variant="caption"
                  color="text.secondary"
                >
                  {formatBytes(file?.size)}
                </Typography>
              </Stack>
              {percent?.[index] && percent?.[index] !== 100 ? (
                <CircularProgress size={20} />
              ) : onSelect ? (
                <Checkbox />
              ) : (
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
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UploadedItems;
