import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import formatBytes from "../../utils/formatBytes.js";

import FileUploadIcon from "@mui/icons-material/FileUpload";

const DragAndDrop = ({ percent, files, onChange }) => {
  const onDrop = useCallback((acceptedFiles) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Card sx={{ flex: 1 }}>
      <input {...getInputProps()} />
      <Stack
        {...getRootProps()}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
        py={3}
        sx={(theme) => {
          return {
            borderRadius: 1.5,
            backgroundColor: !!isDragActive ? theme.palette.grey[700] : "none",
          };
        }}
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
      <Stack sx={{ mt: 2, gap: 1.5 }}>
        {files?.map((item, index) => (
          <Stack
            gap={2}
            direction="row"
            sx={(theme) => {
              return {
                padding: 1.5,
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                borderRadius: 1.5,
              };
            }}
          >
            <Box
              sx={{
                height: 45,
                width: 45,
                backgroundColor: "gray",
                borderRadius: 1.5,
                backgroundImage: `url("${item?.url}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body" fontWeight={600}>
                {item?.name}
              </Typography>
              <Typography variant="body2">{formatBytes(item?.size)}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={percent?.[index] || 0}
                    sx={(theme) => {
                      return {
                        backgroundColor: `${theme.palette.grey[700]} !important`,
                      };
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {`${Math.round(percent?.[index] || 0)}%`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default DragAndDrop;
