import Grid from "@mui/material/Grid";
import MediaCard from "./MediaCard.js";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useMedia } from "../../contexts/media.js";

const UploadedItems = ({ files, onSelect, onDelete }) => {
  const { uploading_files, setUploadingFiles, percent, uploadFiles } =
    useMedia();

  const handleChange = async (files) => {
    let formatted_files = [];

    for await (const file of files) {
      // const base64 = await generateBase64(file);

      formatted_files.push({
        name: file?.name,
        size: file?.size,
        type: file?.type,
        // url: base64,
        raw: file,
      });
    }

    setUploadingFiles(formatted_files);
    uploadFiles(files);
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleChange(acceptedFiles);
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box {...getRootProps()} sx={{ height: "calc(100vh - 180px)" }}>
      {!!files?.length ? (
        <Grid
          container
          spacing={2}
          sx={{ pb: 0, opacity: isDragActive ? 0.5 : 1 }}
        >
          {files?.map((file, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
              <MediaCard
                file={file}
                percent={percent[index]}
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
            height: "100%",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No media
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UploadedItems;
