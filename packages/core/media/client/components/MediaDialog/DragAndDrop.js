import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

import { Card, Stack, Typography, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const DragAndDrop = ({ onChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card {...getRootProps()}>
      <input {...getInputProps()} />
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
        py={3}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <FileUploadIcon />
          <Typography variant="body2">Drag and drop files to upload</Typography>
        </Stack>
        <Button variant="contained" color="primary" size="small">
          Choose files
        </Button>
      </Stack>
      {/* {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )} */}
    </Card>
  );
};

export default DragAndDrop;
