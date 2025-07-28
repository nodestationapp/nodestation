import { useEffect, useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogContent from "@mui/material/DialogContent";

import MediaGrid from "#client/components/MediaGrid.js";

import { useMedia } from "#client/contexts/media.js";
import MediaSortButton from "../MediaSortButton.js";

const MediaDialog = ({ open, onClose, onSubmit, value, loading }) => {
  const { media, percent, page, setDialogPage, sort, setDialogSort } =
    useMedia();

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
          border: "none",
          width: "100%",
          maxWidth: 1100,
          ...(fullScreen && {
            maxWidth: "unset",
            borderRadius: 0,
          }),
        },
      }}
    >
      <DialogTitle id="update-dialog-title">Choose media</DialogTitle>
      <Divider />
      <Stack
        direction="row"
        justifyContent="flex-end"
        px={2}
        py={1}
        sx={(theme) => ({
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.paperChannel} / 0.5)`
            : alpha(theme.palette.background.paper, 1),
        })}
      >
        <MediaSortButton sort={sort} setSort={setDialogSort} />
      </Stack>
      <Divider />

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
            loading={loading}
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
