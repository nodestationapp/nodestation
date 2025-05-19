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

const MediaInput = ({ label, value, onChange }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleSubmit = (value) => {
    onChange(value);
    setUploadDialogOpen(false);
  };

  return (
    <>
      <FormControl fullWidth size="large">
        <InputLabel id="photo-label">{label}</InputLabel>
        <Select
          fullWidth
          open={false}
          label={label}
          onClick={(e) => {
            e.preventDefault();
            setUploadDialogOpen(true);
          }}
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
                    onChange(null);
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
