import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { useTable } from "@nstation/core/tables/client/contexts/table.js";

const DeleteTableModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { deleteTable } = useTable();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    try {
      await deleteTable(open?.id);
      queryClient.refetchQueries("tables");

      navigate("/");
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
      <DialogTitle id="alert-dialog-title">Deleting table</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete <strong>{open?.name}</strong> table?
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

export default DeleteTableModal;
