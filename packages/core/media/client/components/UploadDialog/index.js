import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DragAndDrop from "./DragAndDrop.js";
import { useMedia } from "../../contexts/media.js";
import UploadedItems from "./UploadedItems.js";

const generateBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadDialog = ({ open, onClose }) => {
  const { uploading_files, setUploadingFiles, percent, uploadFiles } =
    useMedia();

  const handleChange = async (files) => {
    let formatted_files = [];

    for await (const file of files) {
      const base64 = await generateBase64(file);

      formatted_files.push({
        name: file?.name,
        size: file?.size,
        type: file?.type,
        url: base64,
        raw: file,
      });
    }

    setUploadingFiles(formatted_files);
    uploadFiles(files);
  };

  const handleClose = () => {
    onClose();
    setUploadingFiles([]);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 650,
        },
      }}
    >
      <DragAndDrop
        percent={percent}
        files={uploading_files}
        onChange={handleChange}
      />
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;
