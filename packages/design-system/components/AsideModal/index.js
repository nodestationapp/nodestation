import { useEffect, useState } from "react";

import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";

const AsideModal = ({
  open,
  header,
  children,
  onClose,
  onSubmit,
  submitLoading = false,
  submitLabel = "Save",
  cancelLabel = "Cancel",
}) => {
  const [is_open, setIsOpen] = useState(open);

  const onSubmitHandler = async (e, type) => {
    if (e.key === "Escape") {
      onCloseHandler();
    } else {
      if (((e.metaKey || e.ctrlKey) && e.key === "s") || type === "submit") {
        e.preventDefault();
        onSubmit();
      }
    }
  };

  const onCloseHandler = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 225);
  };

  useEffect(() => {
    setIsOpen(true);
    document.addEventListener("keydown", onSubmitHandler);

    return () => {
      document.removeEventListener("keydown", onSubmitHandler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Drawer
      open={is_open}
      anchor="right"
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      onClose={onCloseHandler}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: 300, sm: 400 },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        {header}
        <IconButton size="micro" onClick={onCloseHandler}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button
          loading={submitLoading}
          onClick={(e) => onSubmitHandler(e, "submit")}
          variant="contained"
        >
          {submitLabel}
        </Button>
        <Button variant="text" onClick={onCloseHandler}>
          {cancelLabel}
        </Button>
      </DialogActions>
    </Drawer>
  );
};

export default AsideModal;
