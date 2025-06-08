import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Close from "@mui/icons-material/Close";

import { useTheme, useMediaQuery } from "@mui/material";

const AsideModal = ({
  open,
  width = 400,
  header,
  children,
  onClose,
  onSubmit,
  submitLoading = false,
  submitLabel = "Save",
  cancelLabel = "Cancel",
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [is_open, setIsOpen] = useState(null);

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
      anchor={fullScreen ? "bottom" : "right"}
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      onClose={onCloseHandler}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: width },
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
        {!!onSubmit && (
          <Button
            loading={submitLoading}
            onClick={(e) => onSubmitHandler(e, "submit")}
            variant="contained"
          >
            {submitLabel}
          </Button>
        )}
        <Button variant="text" onClick={onCloseHandler}>
          {cancelLabel}
        </Button>
      </DialogActions>
    </Drawer>
  );
};

export default AsideModal;
