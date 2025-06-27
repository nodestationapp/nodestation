import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { BaseLayout } from "@nstation/design-system/Layouts";

import MediaGrid from "#client/components/MediaGrid.js";
import MediaSortButton from "#client/components/MediaSortButton.js";
import UploadDialog from "#client/components/UploadDialog/index.js";
import DeleteMediaModal from "#client/components/DeleteMediaModal.js";

import { useMedia } from "#client/contexts/media.js";

import AddIcon from "@mui/icons-material/Add";
import Settings from "@mui/icons-material/Settings";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

const Media = () => {
  const navigate = useNavigate();
  const { media, page, sort } = useMedia();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteMediaModalOpen, setDeleteMediaModalOpen] = useState(false);

  const tabs = [
    {
      title: "Media",
      href: "/media",
    },
  ];

  return (
    <BaseLayout
      tabs={tabs}
      selectActions={(selectedRows) => (
        <Tooltip title="Delete">
          <IconButton
            size="micro"
            onClick={() => setDeleteMediaModalOpen(selectedRows)}
          >
            <DeleteOutline sx={{ color: "error.light" }} />
          </IconButton>
        </Tooltip>
      )}
      selectedRows={selectedFiles}
      action={() => (
        <>
          <MediaSortButton sort={sort} />
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
      <MediaGrid
        multiple
        percent={[]}
        loading={true}
        files={media?.data}
        count={media?.count}
        page={parseInt(page)}
        selected={selectedFiles}
        onSelect={setSelectedFiles}
        onDelete={(item) => setDeleteMediaModalOpen(item)}
      />
      <UploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
      />
      <DeleteMediaModal
        open={deleteMediaModalOpen}
        setSelectedFiles={setSelectedFiles}
        onClose={() => setDeleteMediaModalOpen(false)}
      />
    </BaseLayout>
  );
};

export default Media;
