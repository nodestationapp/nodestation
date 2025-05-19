import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useTable } from "@nstation/tables/client/contexts/table.js";

const EntriesDeleteModal = ({ open, onClose }) => {
  const { deleteTableEntries } = useTable();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      for await (const item of open) {
        await deleteTableEntries(item);
      }

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
      <DialogTitle id="alert-dialog-title">
        Deleting {open?.length} items
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete{" "}
          <strong>{open?.length} selected</strong> items?
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

export default EntriesDeleteModal;
