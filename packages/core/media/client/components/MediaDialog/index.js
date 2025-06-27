import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogContent from "@mui/material/DialogContent";

import MediaGrid from "#client/components/MediaGrid.js";

import { useMedia } from "#client/contexts/media.js";

const MediaDialog = ({ open, onClose, onSubmit, value }) => {
  const { media, percent, page, setDialogPage } = useMedia();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (value) {
      setSelectedFiles([value]);
    }
  }, [value]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 1000,
          ...(fullScreen && {
            borderRadius: 0,
          }),
        },
      }}
    >
      <DialogTitle id="update-dialog-title">Choose media</DialogTitle>

      <DialogContent>
        <MediaGrid
          variant="wide"
          percent={percent}
          files={media?.data}
          count={media?.count}
          page={parseInt(page)}
          selected={selectedFiles}
          onSelect={setSelectedFiles}
          setDialogPage={setDialogPage}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {!!selectedFiles?.[0]?.id && (
          <Button
            onClick={() => onSubmit(selectedFiles?.[0])}
            variant="contained"
          >
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default MediaDialog;
