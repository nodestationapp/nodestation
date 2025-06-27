import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { useMedia } from "#client/contexts/media.js";

const DeleteMediaModal = ({ open, onClose, setSelectedFiles }) => {
  const { deleteFile } = useMedia();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      for await (const item of open) {
        await deleteFile(item?.id);
      }

      setSelectedFiles([]);
      onClose();
    } catch (err) {
      setLoading(false);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Deleting media</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {open?.length > 1
            ? `Are you sure you want to delete ${open?.length} selected items?`
            : "Are you sure you want to delete selected item?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit} variant="contained" loading={loading}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMediaModal;
