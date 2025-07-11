import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { BaseLayout } from "@nstation/design-system/Layouts";

import UploadDialog from "./components/UploadDialog/index.js";
import UploadedItems from "./components/UploadDialog/UploadedItems.js";

import { useMedia } from "./contexts/media.js";

import AddIcon from "@mui/icons-material/Add";
import Settings from "@mui/icons-material/Settings";

const Media = () => {
  const navigate = useNavigate();
  const { media, deleteFile } = useMedia();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const tabs = [
    {
      title: "Media",
      href: "/media",
    },
  ];

  return (
    <BaseLayout
      tabs={tabs}
      action={() => (
        <>
          <IconButton size="micro" onClick={() => navigate(`/media/settings`)}>
            <Settings />
          </IconButton>
          <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setUploadDialogOpen(true)}
          >
            New
          </Button>
        </>
      )}
    >
      <UploadedItems files={media} percent={[]} onDelete={deleteFile} />
      <UploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      />
    </BaseLayout>
  );
};

export default Media;
