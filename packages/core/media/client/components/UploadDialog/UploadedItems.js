import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Checkbox, CircularProgress, Stack } from "@mui/material";
import formatBytes from "../../utils/formatBytes.js";

const UploadedItems = ({ files, percent }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 1 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        p: 1,
        pb: 0,
      }}
    >
      {files?.map((file, index) => (
        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
          <Card sx={{ width: "100%", p: 1 }}>
            <CardMedia
              sx={{ height: 140, borderRadius: 0.5 }}
              image={file?.url}
              title="green iguana"
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="column" gap={0}>
                <Typography gutterBottom variant="body2" sx={{ m: 0, mt: 1 }}>
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
              {percent[index] && <CircularProgress size={20} />}
              <Checkbox />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UploadedItems;
