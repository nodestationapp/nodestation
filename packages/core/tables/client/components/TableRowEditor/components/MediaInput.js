import { useState } from "react";
import MediaDialog from "../../../../../media/client/components/MediaDialog/index.js";

const MediaInput = ({ value, onChange }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleSubmit = (value) => {
    onChange(value);
    setUploadDialogOpen(false);
  };

  return (
    <>
      <button onClick={() => setUploadDialogOpen(true)}>
        {!!value ? value?.name : "Open file"}
      </button>
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
