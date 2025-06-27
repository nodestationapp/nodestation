import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";

import { useMedia } from "#client/contexts/media.js";
import MediaCard from "#client/components/MediaCard.js";
import useUpdateQueryParam from "#client/utils/useUpdateQueryParam.js";

const MediaGrid = ({
  files,
  multiple,
  onSelect,
  onDelete,
  variant,
  count,
  page,
  setDialogPage,
  selected = [],
}) => {
  const navigate = useNavigate();
  const { setUploadingFiles, percent, uploadFiles, loading } = useMedia();
  const updateQueryParam = useUpdateQueryParam();

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

  if (loading) {
    const items = Array.from({ length: 12 }, (_, index) => index);

    return (
      <Grid container spacing={variant === "wide" ? 1 : 2}>
        {items.map((_, index) => (
          <Grid
            key={index}
            sx={{ height: 202, display: "flex", flexDirection: "column" }}
            size={
              variant === "wide"
                ? { xs: 12, sm: 6, md: 4, lg: 3 }
                : { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }
            }
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: 1 }}
            />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box {...getRootProps()}>
      {!!files?.length ? (
        <Grid
          container
          spacing={variant === "wide" ? 1 : 2}
          sx={{ pb: 0, opacity: isDragActive ? 0.5 : 1 }}
        >
          {files?.map((file, index) => (
            <Grid
              key={file.id}
              size={
                variant === "wide"
                  ? { xs: 12, sm: 6, md: 4, lg: 3 }
                  : { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }
              }
            >
              <MediaCard
                file={file}
                multiple={multiple}
                onSelect={onSelect}
                onDelete={onDelete}
                percent={percent[index]}
                selected={selected?.find((f) => f?.id === file?.id)}
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
      <TablePagination
        page={page}
        count={count}
        sx={{ mt: 2 }}
        component="div"
        rowsPerPage={[24]}
        rowsPerPageOptions={[]}
        onPageChange={(_, page) =>
          !!setDialogPage
            ? setDialogPage(page)
            : updateQueryParam("page", page || undefined)
        }
      />
    </Box>
  );
};

export default MediaGrid;
