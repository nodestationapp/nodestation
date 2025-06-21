import { useState } from "react";
import MediaDialog from "../../../../../media/client/components/MediaDialog/index.js";

import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import { ClearIcon } from "@mui/x-date-pickers";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import InsertPhoto from "@mui/icons-material/Photo";

const MediaInput = ({ data, formik }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const value = formik.values[data?.slug];

  const handleSubmit = (value) => {
    formik?.setFieldValue(data?.slug, value);
    setUploadDialogOpen(false);
  };

  return (
    <>
      <FormControl fullWidth size="large" variant="standard">
        <InputLabel id="photo-label">{data?.name}</InputLabel>
        <Select
          fullWidth
          open={false}
          label={data?.name}
          onClick={(e) => {
            e.preventDefault();
            setUploadDialogOpen(true);
          }}
          variant="standard"
          labelId="photo-label"
          value={true}
          renderValue={() => (
            <Stack direction="row" alignItems="center" gap={1}>
              {value?.url ? (
                <Avatar
                  src={value?.url}
                  sx={{ width: 34, height: 34, objectFit: "cover" }}
                />
              ) : (
                <Avatar sx={{ width: 34, height: 34, objectFit: "cover" }}>
                  <InsertPhoto />
                </Avatar>
              )}
              <Typography color={!!value ? "text.primary" : "text.secondary"}>
                {value?.name || "Empty"}
              </Typography>
            </Stack>
          )}
          endAdornment={
            !!value && (
              <InputAdornment sx={{ marginRight: "10px" }} position="end">
                <IconButton
                  size="micro"
                  onClick={(e) => {
                    e.stopPropagation();
                    formik?.setFieldValue(data?.slug, null);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </FormControl>
      <MediaDialog
        value={value}
        open={uploadDialogOpen}
        onSubmit={handleSubmit}
        onClose={() => setUploadDialogOpen(false)}
      />
    </>
  );
};

export default MediaInput;
