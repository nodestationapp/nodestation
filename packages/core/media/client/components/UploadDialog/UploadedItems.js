import Grid from "@mui/material/Grid";
import MediaCard from "./MediaCard.js";
import { Box, Typography } from "@mui/material";

const UploadedItems = ({ files, percent, onSelect, onDelete }) => {
  return (
    <>
      {!!files?.length ? (
        <Grid container spacing={2} sx={{ pb: 0 }}>
          {files?.map((file, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
              <MediaCard
                file={file}
                index={index}
                percent={percent}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 180px)",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No media
          </Typography>
        </Box>
      )}
    </>
  );
};

export default UploadedItems;
