import { useState } from "react";
import MediaDialog from "../../../../../media/client/components/MediaDialog/index.js";

import {
  Stack,
  Select,
  Avatar,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";

const MediaInput = ({ value, onChange }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleSubmit = (value) => {
    onChange(value);
    setUploadDialogOpen(false);
  };

  return (
    <>
      <FormControl fullWidth size="large">
        <InputLabel id="photo-label">Photo</InputLabel>
        <Select
          fullWidth
          open={false}
          label="Photo"
          onClick={(e) => {
            e.preventDefault();
            setUploadDialogOpen(true);
          }}
          labelId="photo-label"
          value={true}
          renderValue={() => (
            <Stack direction="row" alignItems="center" gap={1}>
              <Avatar
                src={value?.url}
                sx={{ width: 34, height: 34, objectFit: "cover" }}
              />
              <Typography color={!!value ? "text.primary" : "text.secondary"}>
                {value?.name || "Empty"}
              </Typography>
            </Stack>
          )}
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
