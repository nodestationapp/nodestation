import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import UploadedItems from "./UploadedItems.js";
import DialogActions from "@mui/material/DialogActions";

import { useMedia } from "../../contexts/media.js";

const MediaDialog = ({ open, onClose, onSubmit, value }) => {
  const { media, percent } = useMedia();

  const [selectedFiles, setSelectedFiles] = useState({});

  const handleSelect = (file) => {
    setSelectedFiles(file);
  };

  useEffect(() => {
    if (value) {
      setSelectedFiles(value);
    }
  }, [value]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 830,
        },
      }}
    >
      <UploadedItems
        files={media}
        percent={percent}
        onSelect={handleSelect}
        selected={selectedFiles}
      />
      {/* {!!uploading_files?.length ? (
        <UploadedItems files={uploading_files} percent={percent} />
      ) : (
        <DragAndDrop onChange={handleChange} />
      )} */}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {!!selectedFiles?.id && (
          <Button onClick={() => onSubmit(selectedFiles)} variant="contained">
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MediaDialog;
